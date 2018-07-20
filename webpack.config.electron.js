/**
 * Build config for electron 'Main Process' file
 */

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const path = require("path");

module.exports = merge(baseConfig, {
	devtool: "source-map",
	entry: { "app.min": path.join(__dirname, "src", "main") },
	//mode: "production",
	plugins: [],
	output: {},
	target: "electron-main"
});
