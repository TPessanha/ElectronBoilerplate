# Documentation
Here is all the information you will need to understand how to work with this boilerplate.

## Scripts in package.json
A short description of what each script does:

| **Script**        | **Description**|
| ----------------- | ----------------- |
| build             | Builds the electron application and outputs it to /dist.|
| build:main        | Gets called by build, builds the electron main process and outputs it to /dist.|
| build:renderer    | Gets called by build, builds the electron renderer process and outputs it to /dist.|
| build:web         | builds a web version of the application and outputs it to /dist.|
| start             | Starts the electron application from /dist/app.min.js.|
| prestart          | Before start runs, this runs the clean and build scripts.|
| clean             | Runs any script that fits the pattern (remove:*).|
| remove:dist       | Deletes everything inside /dist folder.|
| dev               | Starts development mode with hot reloading. (read more about it [here](#dev-script))|
| start:dev_server  | Starts up a development server to serve the page with hot-reload .|
| start:dev         | Starts the electron application in development mode with hot-reload.|
| package           | Packages the electron app for the current plataform.|
| package:win       | Packages the electron app for the windows x64 plataform.|
| package:linux     | Packages the electron app for the linux plataform.|
| package:all       | Packages the electron app for all plataforms.|
| test              | Runs jest to test the app.|
| test:cover        | Runs jest to test the app and generates a coverage report in /coverage.|
| test:snapshot     | Runs jest to test the app and updates the snapshots.|
| generate:dts      | Generate dts files from SASS files, so you can import style files and use autocomplete (Run after create/update a SASS file).|
| lint              | Runs any script that fits the pattern (lint:*).|
| lint:eslint       | Runs linting for javascript files with ESLint.|
| lint:tslint       | Runs linting for typescript files with TSLint.|
| format:src        | Formats files in the /src folder with prettier.|
| format:all        | Formats all files with prettier.|
| preversion        | Before version runs, this runs the lint, test and format:all scripts.|
| version           | Stages the changes made to version controlled files, you run this with "npm version" (Read more about it [here](https://docs.npmjs.com/cli/version)).|
| postversion       | After version runs, this pushes the commited files and tags to remote.|

### Dev script
Use this in the development fase of your project, `npm start` uses a production ready build so it is slower and doesnt't have hot reaload.

The `dev` script script has some optional parameters to help in development, these arguments are passed to the `start:dev_server` script, if you prefer you can put them directly in the `start:dev_server` script, the reason they are in `dev` is so you can call `start:dev_server` separatly if you want easier, the arguments are:

1. `--startHot` will automatically start up the electron app by running the script `start:dev`,
if you by any reason want to run another script instead of `start:dev` you can pass it like a parameter `--startHot <script>`.

2. `--linkLife` will link the life of the electron app with the development server
so if you close the app the server also closes, usefull so you don't have to close both every time.

## Debugging

If you are using [VS Code](https://code.visualstudio.com/) as your IDE you can debug the main and renderer processes doing the following:

1. Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) VS Code extension.

2. Add the following to your launch.json in .vscode.
```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "launch",
			"name": "Electron: Main",
			"protocol": "inspector",
			"runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
			"runtimeArgs": [
				"${workspaceRoot}/src/main.development.js",
				"--remote-debugging-port=9223",
				"."
			],
			"windows": {
				"runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
			}
		},
		{
			"name": "Electron: Renderer",
			"type": "chrome",
			"request": "attach",
			"port": 9223,
			"webRoot": "${workspaceFolder}",
			"timeout": 30000
		}
	],
	"compounds": [
		{
			"name": "Electron: All",
			"configurations": [
				"Electron: Main",
				"Electron: Renderer"
			]
		}
	]
}
```

Now you can debug your main and renderer process, to debug the renderer process you need to start the development server with `start:dev_server`, for the main process you only need to run it but no content will be displayed in the electron app.

You can run both with `Electron: All`.

## Developer tools

When in development with an electron application you have access to the following chrome addons in the build-in chrome developer extensions:

* [React Developer Tools](https://github.com/facebook/react-devtools) - Installed via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Installed via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
