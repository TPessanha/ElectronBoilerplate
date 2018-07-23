/**
 * Base webpack config used across other specific configs
 */

const path = require("path");
//const { dependencies: externals } = require("./app/package.json");

module.exports = {
	mode: process.env.NODE_ENV || "production",
	resolve: {
		extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
		modules: [path.resolve(__dirname, "src"), "node_modules"]
	},
	output: {
		path: path.resolve("./dist"),
		filename: "[name].js",
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
				use: "file-loader"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "image/svg+xml"
					}
				}
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
				use: "url-loader"
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
