const fs = require('fs');
const path = require('path');
const dataUtil = require('./dataUtil.js');


function createNewProjectDir(dirName) {
    let projectDir = dataUtil.getAppData().projectDir;
    if (!fs.existsSync(projectDir)) {
        console.log(projectDir + "  - does not exist!");
        process.exit(1);
    } else {
       fs.mkdirSync(projectDir + dirName + path.sep);
       return projectDir + dirName + path.sep;
    }
}