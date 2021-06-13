const path = require('path');

module.exports = {
	entry: {
		index: './src/js/index.js',
	},
	mode: 'none',
	devtool: 'source-map',
	devServer: {
		contentBase: './dist',
		open: false,
	},
	output: {}
}