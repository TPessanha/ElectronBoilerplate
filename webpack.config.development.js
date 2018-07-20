/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const port = process.env.PORT || 3000;

module.exports = merge(baseConfig, {
	devtool: "inline-source-map",
	mode: "development",
	//context: path.join(__dirname),
	entry: [
		"react-hot-loader/patch",
		`webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr&reload=true`,
		path.join(__dirname, "src", "index")
	],

	output: {
		filename: "index.js",
		publicPath: `http://localhost:${port}/dist/`
	},

	module: {},
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
			mobile: false,
			lang: "en-US",
			title: "My App"
		})
	],

	// https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
	target: "electron-renderer"
});
