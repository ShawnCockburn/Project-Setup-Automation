# Project-Setup-Automation
A CLI tool to automate setting up development projects

## Important:
:point_right: To use this tool you will need a 'Personal Access Token' with the permissions below:

![Image of permissions needed for application key](https://i.imgur.com/GRStXfW.png)

you will be asked for this key as well as your github username when you first use the tool. **_WARNING_ this key is stored in a plain text file called `data.json`** :scream:

:point_right: When using the `createproject` command you must include your new project name. E.G: `createproject 'test-project'`

## Tool options:

`-l`    Language flag: specify the project language E.G: 'NodeJS'

`-g`    Local Git flag: only create local Git repository. _(Default, create Github repo and push to it)_

`-p`    Private Github repo flag: Create private Github repo. _(Default, public)_

`-c`    Code Editor flag _(Default, open = true)_

`-h`    help _(should not be used in combination with other flags)_

## Examples:
* `createproject 'test-project'` Create default project with no specified language named 'test-project' and upload to Gitgub

* `createproject 'test-project' -l 'node'` Create Node.JS project named 'test-project' and upload to Gitgub. (you can specify a language with any alias it has in `data.json` for example: `nodejs` `node-js` `node.js` `NODEJS`, you can also add any language you want to this file)

* `createproject 'test-project' -l 'node' -p` Create Node.JS project named 'test-project' and upload to Gitgub in a private Repo.

## Installation:
`npm install -g github:ShawnCockburn/Project-Setup-Automation`
