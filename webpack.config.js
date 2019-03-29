const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'popup': './src/popup.js',
		'scripts/messageReceiver': './src/scripts/messageReceiver'
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'production',
	plugins: [
		new CopyPlugin([
			{ from: './src/manifest.json', to: './'},
			{ from: './src/images', to: './images'},
			{ from: './src/common', to: './common'}
		]), 
		new HtmlWebpackPlugin({
			filename: 'popup.html',
			template: './src/popup.html',
			excludeChunks: [ 'scripts/messageReceiver']
		})
	]
};
