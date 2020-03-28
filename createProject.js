//imports
const path = require('path');
//global
global.appRoot = path.resolve(__dirname);

//imports
const argv = require('yargs').argv
const createDir = require("./app_modules/createDirectory.js");
const setupApp = require("./app_modules/setupApp.js");

//Arguments
const newProjectName = argv._;
const projectLanguage = argv.l;
const projectLocalGit = argv.m;

//App setup
setupApp.setupApp();

//Main
function app() {
    if (newProjectName == undefined || newProjectName == null) {
        //todo: display help
        process.exit(1);
    }
    let newProjectLocation = createDir.createNewProjectDir(newProjectName);
}
app();