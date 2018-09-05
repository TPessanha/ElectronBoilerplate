/**
 * Build config for electron 'Renderer Process' file
 */
const appPaths = require("./appPaths");
const merge = require("webpack-merge");
const productionConfig = require("./webpack.config.production");
// Plugins
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = merge(productionConfig, {
	target: "web",
	output: {
		libraryTarget: "var"
	},
	module: {
		rules: []
	},
	plugins: [
		new ManifestPlugin({
			fileName: "asset-manifest.json"
		}),
		new CopyWebpackPlugin([
			{
				from: appPaths.resources + "/*.ico",
				to: appPaths.appDist,
				flatten: true
			},
			{
				from: appPaths.resources + "/*.json",
				to: appPaths.appDist,
				flatten: true
			},
			{
				from: appPaths.resources + "/*.png",
				to: appPaths.appDist,
				flatten: true
			}
		]),

		new SWPrecacheWebpackPlugin({
			cacheId: "tp.ElectronBoilerplate",
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: "service-worker.js",
			minify: true,
			navigateFallback: "./index.html",
			staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
		})
	]
});
