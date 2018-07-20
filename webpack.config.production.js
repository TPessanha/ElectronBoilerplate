/**
 * Build config for electron 'Renderer Process' file
 */

const path = require("path");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
	devtool: "cheap-module-source-map",
	//mode: "production",
	entry: { index: path.join(__dirname, "src", "index") },

	module: {
		rules: [
			// Common Image Formats
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
				use: "url-loader"
			}
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname),
		compress: true,
		port: 3000,
		stats: "minimal"
	},
	plugins: [
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
