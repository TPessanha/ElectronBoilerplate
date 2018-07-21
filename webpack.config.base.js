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
			// WOFF Font
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
			// WOFF2 Font
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
			// TTF Font
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
			// EOT Font
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: "file-loader"
			},
			// SVG Font
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
			// Common Image Formats
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
				loader: "ts-loader",
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
					// eslint options (if necessary)
					typeCheck: true,
					emitErrors: true
				}
			},
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["env", "react"]
						}
					}
				],
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
