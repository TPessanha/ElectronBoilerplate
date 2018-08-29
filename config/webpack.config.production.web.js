/**
 * Build config for electron 'Renderer Process' file
 */
const merge = require("webpack-merge");
const productionConfig = require("./webpack.config.production");

module.exports = merge(productionConfig, {
	target: "web",
	output: {
		libraryTarget: "var"
	},
	module: {
		rules: []
	},
	plugins: []
});
