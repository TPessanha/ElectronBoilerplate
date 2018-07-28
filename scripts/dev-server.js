const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("../config/webpack.config.development");

const ignoredFiles = require("react-dev-utils/ignoredFiles");
const appPaths = require("../config/appPaths");
const { spawn } = require("child_process");

const host = process.env.HOST || "0.0.0.0";
const port = parseInt(process.env.PORT, 10) || 3000;

const options = {
	port: port,
	stats: "minimal",
	host: host,
	inline: true,
	hot: true,
	compress: true,
	watchOptions: {
		ignored: ignoredFiles(appPaths.appNodeModules, appPaths.appSrc)
	},
	before() {
		const argv = require("minimist")(process.argv.slice(2));
		if (argv.startHot) {
			spawn(
				"npm",
				["run", argv.startHot === true ? "start:dev" : argv.startHot],
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
	}
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, host, () => {
	console.log(`dev server listening on port ${port}`);
});
