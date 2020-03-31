const fs = require('fs');
const path = require('path');
const dataUtil = require('./dataUtil.js');
const shell = require('shelljs');
const gitIgnores = appRoot + "/resources/gitignore/";


function createNewProjectDir(dirName) {
    let projectsDir = dataUtil.getAppData().projectDir;
    let newProjectDir = projectsDir + dirName + path.sep;
    if (!fs.existsSync(projectsDir)) {
        console.log(projectsDir + "  - does not exist!");
        process.exit(1);
    } else {
        if (fs.existsSync(newProjectDir)) {
            console.log(dirName + " already exists, choose a differnt name.");
            process.exit(1);
        }
        fs.mkdirSync(newProjectDir);
        return newProjectDir;
    }
}

function setupFiles(directory, language) {
    fs.copyFileSync(gitIgnores + language.gitignore, directory + ".gitignore", (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
    shell.cd(directory);
    if (shell.exec("touch README.md").code !== 0) {
        shell.echo('Error: Git readme.md add failed');
        shell.exit(1);
    }

    language.setupCommands.forEach(cmd => {
        if (shell.exec(cmd).code !== 0) {
            shell.echo('Error: setup command "' + cmd + '" failed');
            shell.exit(1);
        }
    });
}

exports.createNewProjectDir = createNewProjectDir;
exports.setupFiles = setupFiles;