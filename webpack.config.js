const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'popup': './src/popup.js',
		'scripts/background': './src/scripts/background.js',
		'scripts/content': './src/scripts/content.js'
	},
	devtool: 'cheap-source-map',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	mode: 'development',
	plugins: [
		new CopyPlugin([
			{ from: './src/manifest.json', to: './' },
			{ from: './src/images', to: './images' },
			{ from: './src/common', to: './common' }
		]),
		new HtmlWebpackPlugin({
			filename: 'popup.html',
			template: './src/popup.html',
			excludeChunks: [ 'scripts/content.js']
		})
	]
};
