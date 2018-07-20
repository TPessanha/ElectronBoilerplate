/**
 * Base webpack config used across other specific configs
 */

const path = require("path");
//const { dependencies: externals } = require("./app/package.json");

module.exports = {
	mode: process.env.NODE_ENV || "production",
	resolve: {
		extensions: [".scss", ".ts", ".tsx", ".json", ".js", ".jsx"],
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
