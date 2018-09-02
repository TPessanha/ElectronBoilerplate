/**
 * Base webpack config used across other specific configs
 */

const appPaths = require("./appPaths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
			//Run ESlint
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
				oneOf: [
					{
						test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
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
					},
					{
						test: /\.(scss|sass|css|less)$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: "css-loader",
								options: {
									minimize: true,
									sourceMap: true
								}
							},
							{
								loader: "postcss-loader",
								options: {
									plugins: () => [require("autoprefixer")],
									sourceMap: true
								}
							},
							{
								loader: "sass-loader",
								options: {
									sourceMap: true
								}
							} // compiles Sass to CSS
						],
						exclude: /node_modules/
					},
					//HAS TO BE LAST
					{
						loader: "file-loader",
						// Exclude `js` files to keep "css" loader working as it injects
						// it's runtime that would otherwise processed through "file" loader.
						// Also exclude `html` and `json` extensions so they get processed
						// by webpacks internal loaders.
						exclude: [/\.(js|jsx|ts|tsx|mjs|html|json|ejs|scss|less)$/],
						options: {
							name: "static/media/[name].[hash:8].[ext]"
						}
					}
				]
			}
		]
	},
	performance: {
		hints: "error",
		assetFilter: function(assetFilename) {
			return assetFilename.endsWith(".js");
		}
	},
	node: {
		__dirname: false,
		__filename: false
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[contenthash:8].css",
			chunkFilename: "static/css/[id].[contenthash:8].css"
		})
	],
	externals: []
	/* externals: {
		react: "React",
		"react-dom": "ReactDOM"
	} */
	//externals: Object.keys(externals || {})
};
