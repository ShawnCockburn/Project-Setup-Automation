const readlineSync = require('readline-sync');
const shell = require('shelljs');
const dataUtil = require('./dataUtil.js');


function setupApp(){
    if (!shell.which('git')) {
        shell.echo('Sorry, this tool requires git');
        shell.exit(1);
      } else {
          return setupAppSecrets();
      }
}

function setupAppSecrets() {
    if (dataUtil.appDataExists()) {
        return true;
    } else {
        let githubUsername = readlineSync.question("What's your GitHub username? ");
        let githubPassword = readlineSync.question("What's your GitHub password? ", {
            hideEchoBack: true
        });
        let projectDirectory = readlineSync.question("Where do you want your new projects to be created(example: C:\\Users\\User\\Projects\\)? ");
        dataUtil.setupAppData(githubUsername, githubPassword, projectDirectory);
    }
}

exports.setupApp = setupApp;