/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appPaths = require("./appPaths");
const { spawn } = require("child_process");

const port = parseInt(process.env.PORT, 10) || 3000;

module.exports = merge(baseConfig, {
	devtool: "cheap-module-source-map",
	mode: process.env.NODE_ENV || "development",
	devServer: {
		port: port,
		stats: "minimal",
		host: "0.0.0.0",
		inline: true,
		before() {
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
		}
	},
	entry: [
		//"react-hot-loader/patch",
		//`webpack-dev-server/client?http://localhost:${port}`,
		//"webpack/hot/only-dev-server",
		appPaths.appSrcIndex
	],

	output: {
		filename: "index.js",
		//publicPath: `http://localhost:${port}/dist/`,
		libraryTarget: "var" //Allows browser viewing not sure if it should be var
	},

	module: {
		rules: [
			{
				test: /\.(scss|sass)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
							localIdentName: "[path][name]_[local]"
						}
					},
					"sass-loader"
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
							localIdentName: "[path][name]_[local]"
						}
					}
				],
				exclude: /node_modules/
			}
		]
	},
	performance: {
		hints: false
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),

		new webpack.LoaderOptionsPlugin({
			debug: true
		}),

		new HtmlWebpackPlugin({
			inject: false,
			template: appPaths.appHtmlTemplateEJS,
			appMountId: "root",
			mobile: true,
			lang: "en-US",
			title: "My App"
		})
	]
});
