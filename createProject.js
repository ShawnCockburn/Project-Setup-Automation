//global
global.appRoot = __dirname;

//imports
const argv = require('yargs').argv
const createDir = require("./app_modules/createDirectory.js");
const setupApp = require("./app_modules/setupApp.js");
const gitUtil = require("./app_modules/gitUtil.js");
const dataUtil = require("./app_modules/dataUtil.js");
const _ = require("lodash");
const normalizeText = require('normalize-text');

//Arguments
let newProjectNameArgv = "";
let projectLanguageArgv = "";
if (argv._) {
    newProjectNameArgv = _.kebabCase(normalizeText.normalizeText(argv._));
}
if (argv.l) {
    projectLanguageArgv = _.lowerCase(normalizeText.normalizeText(argv.l));
}
const newProjectName = newProjectNameArgv;
const projectLanguage = projectLanguageArgv;
const projectLocalGit = argv.g;
const projectHelp = argv.h;

//App setup
setupApp.setupApp();
if(newProjectName == "help" || projectHelp){
    diplayHelp();
    process.exit(0);
}

//Main
function app() {
    if (newProjectName == undefined || newProjectName == null || newProjectName == "") {
        diplayHelp();
        process.exit(1);
    }
    let matches = newProjectName.match(/\d+/g);
    if (matches != null) {
        console.log("Name cannot contain numbers! Try again...")
        process.exit(1);
    }
    console.log("Creating project directory.")
    let newProjectLocation = createDir.createNewProjectDir(newProjectName);
    console.log("Setting up project files.")
    createDir.setupFiles(newProjectLocation, matchLanguage());
    console.log("Creating project Github repo.")
    gitUtil.gitInitPush(newProjectLocation, newProjectName, false);
}

function matchLanguage() {
    let foundProjectLanguage = "";
    let data = dataUtil.getAppData().languageSetup;
    if (projectLanguage == undefined || projectLanguage == null) {
        return data[0];
    }
    let dataElement = 0;

    for (let index = 0; index < data.length; index++) {
        const language = data[index];
        for (let aliasIndex = 0; aliasIndex < language.alias.length; aliasIndex++) {
            const alias = language.alias[aliasIndex];
            if (normalizeText.normalizeText(alias) == projectLanguage) {
                foundProjectLanguage = alias;
                dataElement = index;
            }
        }
    }
    if (foundProjectLanguage === "") {
        console.log("No matching language found for " + projectLanguage + ". You can add languages in data.json")
        return data[0];
    } else {
        return data[dataElement];
    }
}

function diplayHelp() {
    console.log("\tCreateProject help")
    console.log("Must include project name. E.G: 'createproject 'test-project'");
    console.log("-l\tLanguage flag: specify the project language E.G: 'NodeJS'");
    console.log("-g\tLocal Git flag: only create local Git repository. (Default, create Github repo and push to it)");
    console.log("-h\thelp");

}

app();