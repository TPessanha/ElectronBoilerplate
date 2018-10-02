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
| dev               | Starts development mode with hot reloading.|
| start:dev_server  | Starts up a development server to serve the page with hot-reload (read more about it [here](#start-dev-server-script)).|
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

### Start dev server script
The `start:dev_server` script has some optional parameters to help in development:

1. `--startHot` will automatically start up the electron app by running the script `start:dev`,
if you by any reason want to run another script instead of `start:dev` you can pass it like a parameter `--startHot <script>`.

2. `--linkLife` will link the life of the electron app with the development server
so if you close the app the server also closes, usefull so you don't have to close both every time.

## Developer tools

When in development with an electron application you have access to the following chrome addons in the build-in chrome developer extensions:

* [React Developer Tools](https://github.com/facebook/react-devtools) - Installed via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Installed via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
