const shell = require('shelljs');
const dataUtil = require('./dataUtil.js');
const { Octokit } = require('@octokit/rest');
const configData = dataUtil.getAppData();


async function gitInitPush(directory, isLocal, repoName, isPrivate) {
    if (!isLocal) {
        const octokit = new Octokit({
            auth: configData.token
        });
        await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            private: isPrivate
        });
    }

    let githubRepoURL = `https://github.com/${configData.username}/${repoName}`;
    shell.cd(directory);
    if (shell.exec('git init').code !== 0) {
        shell.echo('Error: Git init failed');
        shell.exit(1);
    }
    if (shell.exec('git add .').code !== 0) {
        shell.echo('Error: Git add failed');
        shell.exit(1);
    }
    if (shell.exec('git commit -m "Inital commit"').code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
    }

    if (!isLocal) {
        if (shell.exec('git remote add origin ' + githubRepoURL + '.git').code !== 0) {
            shell.echo('Error: Git remote add failed');
            shell.exit(1);
        }

        if (shell.exec("git push origin master").code !== 0) {
            shell.echo('Error: Git push failed');
            shell.exit(1);
        }
    }

}



exports.gitInitPush = gitInitPush;