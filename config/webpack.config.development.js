/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const appPaths = require("./appPaths");
//plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = merge(baseConfig, {
	devtool: "cheap-module-source-map",
	mode: process.env.NODE_ENV || "development",
	entry: {
		//"react-hot-loader/patch",
		//`webpack-dev-server/client?http://localhost:${port}`,
		//"webpack/hot/only-dev-server",
		index: appPaths.appSrcIndex
	},

	output: {
		filename: "index.js",
		//publicPath: `http://localhost:${port}/dist/`,
		libraryTarget: "var" //Allows browser viewing not sure if it should be var
	},

	module: {},
	performance: {
		hints: false
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HardSourceWebpackPlugin(),
		new HtmlWebpackPlugin({
			inject: false,
			template: appPaths.appSrcHtmlTemplateEjs,
			appMountId: "root",
			mobile: true,
			lang: "en-US",
			title: "My App"
		})
	]
});
