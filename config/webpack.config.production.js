/**
 * Build config for electron 'Renderer Process' file
 */

const appPaths = require("./appPaths");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseConfig, {
	target: "electron-renderer",
	entry: { index: appPaths.appSrcIndex },
	module: {
		rules: [
			{
				test: /\.(scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader" // compiles Sass to CSS
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[contenthash:8].css",
			chunkFilename: "static/css/[id].[contenthash:8].css"
		}),

		new HtmlWebpackPlugin({
			inject: false,
			template: appPaths.appHtmlTemplateEJS,
			appMountId: "root",
			mobile: false,
			lang: "en-US",
			title: "My App",
			meta: [
				{
					"http-equiv": "Content-Security-Policy",
					content:
						"default-src 'none'; style-src 'self' data:; img-src 'self' data:; script-src 'self'; connect-src 'self';"
				}
			],
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
