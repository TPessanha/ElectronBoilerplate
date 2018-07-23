/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { spawn } = require("child_process");

const port = process.env.PORT || 3000;

module.exports = merge(baseConfig, {
	devtool: "inline-source-map",
	mode: process.env.NODE_ENV || "development",
	//context: path.join(__dirname),

	devServer: {
		port: port,
		stats: "minimal",
		hot: true,
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
					.on("close", code => process.exit(code))
					.on("error", spawnError => console.error(spawnError));
			}
		}
	},
	entry: [
		"react-hot-loader/patch",
		`webpack-dev-server/client?http://localhost:${port}`,
		"webpack/hot/only-dev-server",
		path.join(__dirname, "src", "index")
	],

	output: {
		filename: "index.js",
		publicPath: `http://localhost:${port}/dist/`,
		libraryTarget: "var" //Allows browser viewing not sure if it should be var
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["es2015", "react"]
						}
					}
				],
				exclude: /node_modules/
			},
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
					"sass-loader" // compiles Sass to CSS
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
	plugins: [
		// https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NoEmitOnErrorsPlugin(),

		// NODE_ENV should be production so that modules do not perform certain development checks
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),

		new webpack.LoaderOptionsPlugin({
			debug: true
		}),

		new HtmlWebpackPlugin({
			inject: false,
			template: "./src/index.ejs",
			appMountId: "root",
			mobile: true,
			lang: "en-US",
			title: "My App"
		})
	]

	// https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
});
