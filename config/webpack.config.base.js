/**
 * Base webpack config used across other specific configs
 */

const path = require("path");
const appPaths = require("./appPaths");
//const { dependencies: externals } = require("./app/package.json");

module.exports = {
	mode: process.env.NODE_ENV || "production",
	devtool: "source-map",
	bail: true,
	//stats: {  },
	resolve: {
		extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
		modules: [appPaths.appNodeModules]
	},
	output: {
		path: appPaths.appDist,
		filename: "static/js/[name].[chunkhash:8].js",
		chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
		libraryTarget: "commonjs2"
	},
	module: {
		rules: [
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "application/font-woff"
					}
				}
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "application/font-woff"
					}
				}
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "application/octet-stream"
					}
				}
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "file-loader",
					options: {
						name: "static/media/[name].[hash:8].[ext]"
					}
				}
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "image/svg+xml",
						name: "static/media/[name].[hash:8].[ext]"
					}
				}
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						name: "static/media/[name].[hash:8].[ext]"
					}
				}
			},
			{
				test: /\.ts$/,
				enforce: "pre",
				loader: "tslint-loader",
				options: {
					typeCheck: true,
					emitErrors: true
				},
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				loader: ["babel-loader", "ts-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: "json-loader",
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				enforce: "pre",
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
					typeCheck: true,
					emitErrors: true
				}
			},
			{
				test: /\.jsx?$/,
				use: ["babel-loader"],
				exclude: /node_modules/
			}
		]
	},
	performance: {
		hints: "error"
	},
	node: {
		__dirname: false,
		__filename: false
	},
	plugins: [],
	externals: []
	/* externals: {
		react: "React",
		"react-dom": "ReactDOM"
	} */
	//externals: Object.keys(externals || {})
};
