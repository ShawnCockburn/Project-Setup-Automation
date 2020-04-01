const shell = require('shelljs');

function open(language, projectDir){
    shell.cd(projectDir);
    if (shell.exec(language.editorCommand).code !== 0) {
        shell.echo('Error: opening code editor failed, editor may not be installed command used: ' + language.editorCommand);
        shell.exit(1);
    }
}

exports.open = open;