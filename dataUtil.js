const fs = require('fs');
const path = require('path');
const workingDir = __dirname;
const dataFile = workingDir + path.sep + "data.json";

function appDataExists() {
    return fs.existsSync(dataFile);
}

function setupAppData(githubUsername, githubPassword, projectDirectory) {
    if(projectDirectory.substr(projectDirectory.length - 1) != path.sep){
        projectDirectory = projectDirectory + path.sep;
    }
    let data = JSON.stringify({
        username: githubUsername,
        password: githubPassword,
        projectDir: projectDirectory
    });

    fs.writeFile(dataFile, data,'utf8', function (err) {
        if (err) {
            console.log(err);
            return false;
        }
        return true;
    });
}

function getAppData(){
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

exports.setupAppData = setupAppData;
exports.appDataExists = appDataExists;
exports.getAppData = getAppData;