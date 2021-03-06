const fs = require('fs');
const path = require('path');
const dataFile = appRoot + path.sep + "data.json";
const defaultLanguageDataFile = appRoot + path.sep + "resources/defaults/defaultLanguageData.json";

function appDataExists() {
    return fs.existsSync(dataFile);
}

function setupAppData(githubUsername, githubToken, projectDirectory) {
    if(projectDirectory.substr(projectDirectory.length - 1) != path.sep){
        projectDirectory = projectDirectory + path.sep;
    }
    let defaultLanguageData = JSON.parse(fs.readFileSync(defaultLanguageDataFile, 'utf8'));
    let data = JSON.stringify({
        username: githubUsername,
        token: githubToken,
        projectDir: projectDirectory,
        defaultLanguageData: defaultLanguageData.defaultLanguageData
    });

    fs.writeFileSync(dataFile, data,'utf8', function (err) {
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