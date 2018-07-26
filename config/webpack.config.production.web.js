/**
 * Build config for electron 'Renderer Process' file
 */
const appPaths = require("./appPaths");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const productionConfig = require("./webpack.config.production");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(productionConfig, {
	target: "web",
	output: {
		libraryTarget: "var"
	},
	module: {
		rules: []
	},
	plugins: []
});
