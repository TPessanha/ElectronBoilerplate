const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("../config/webpack.config.development");

const ignoredFiles = require("react-dev-utils/ignoredFiles");
const appPaths = require("../config/appPaths");
const chalk = require("chalk");
const {
	choosePort,
	createCompiler,
	prepareProxy,
	prepareUrls
} = require("react-dev-utils/WebpackDevServerUtils");
const { spawn } = require("child_process");

const HOST = process.env.HOST || "0.0.0.0";
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

const options = {
	port: DEFAULT_PORT,
	stats: "minimal",
	host: HOST,
	inline: true,
	hot: true,
	compress: true,
	watchOptions: {
		ignored: ignoredFiles(appPaths.appNodeModules, appPaths.appSrc)
	}
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const devServer = new webpackDevServer(compiler, options);

choosePort(HOST, DEFAULT_PORT)
	.then(port => {
		if (port == null) {
			// We have not found a port.
			return;
		}
		process.env.PORT = port;
		// Launch WebpackDevServer.
		devServer.listen(port, HOST, err => {
			if (err) {
				return console.log(err);
			}
			console.log(chalk.cyan("Starting the development server...\n"));

			const argv = require("minimist")(process.argv.slice(2));
			if (argv.startHot) {
				spawn(
					"npm",
					[
						"run",
						argv.startHot === true ? "start:dev" : argv.startHot
					],
					{
						shell: true,
						env: process.env,
						stdio: "inherit"
					}
				)
					.on("close", code => {
						if (argv.linkLife) process.exit(code);
					})
					.on("error", spawnError => console.error(spawnError));
			}
		});

		["SIGINT", "SIGTERM"].forEach(function(sig) {
			process.on(sig, function() {
				devServer.close();
				process.exit();
			});
		});
	})
	.catch(err => {
		if (err && err.message) {
			console.log(err.message);
		}
		process.exit(1);
	});
