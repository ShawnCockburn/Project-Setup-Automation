const fs = require('fs');
const path = require('path');
const dataUtil = require('./dataUtil.js');


function createNewProjectDir(dirName) {
    let projectsDir = dataUtil.getAppData().projectDir;
    let newProjectDir = projectsDir + dirName + path.sep;
    if (!fs.existsSync(projectsDir)) {
        console.log(projectsDir + "  - does not exist!");
        process.exit(1);
    } else {
        if(fs.existsSync(newProjectDir)) {
            console.log(dirName + " already exists, choose a differnt name.");
            process.exit(1);
        }
       fs.mkdirSync(newProjectDir);
       return newProjectDir;
    }
}

exports.createNewProjectDir = createNewProjectDir;