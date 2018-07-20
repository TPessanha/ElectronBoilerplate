/**
 * Build config for electron 'Renderer Process' file
 */

const path = require("path");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
	target: "electron-renderer",
	devtool: "cheap-module-source-map",
	entry: { index: path.join(__dirname, "src", "index") },
	module: {
		rules: []
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			template: "./src/index.ejs",
			appMountId: "root",
			mobile: true,
			lang: "en-US",
			title: "My App",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		})
	]
});
