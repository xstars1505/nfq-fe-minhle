require('babel-polyfill');

module.exports = {
	mode: 'development',
	entry: [
		'babel-polyfill',
		'./src/index.js'
	],
	output: {
		path: __dirname + '/public/client/',
		publicPath: '/',
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(css|scss)$/,
				loader: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(jpg|png|woff|woff2|eot|ttf|svg|gif)$/,
				loader: 'url-loader?url-loader?limit=1024000'
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './public/client'
	}
};
