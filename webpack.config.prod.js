require("babel-polyfill");

const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const DotENV = require('dotenv');
const CompressionPlugin = require('compression-webpack-plugin');

DotENV.config();

const publicUrl = process.env.PUBLIC_URL || 'dist';

const HtmlWebpackPluginConfig = new HtmlWebPackPlugin({
	template: './public/template/index.html',
	filename: 'index.html',
	inject: 'body'
});

const fs = require('fs-extra');

fs.emptyDir(`./public/${publicUrl}`);

let mode = process.env.NODE_ENV;
if (mode !== 'production' && mode !== 'development') {
	mode = 'none';
}

let plugins = [
	new webpack.DefinePlugin({
		'process.env.REACT_ENV': JSON.stringify(process.env.NODE_ENV)
	}),
	new webpack.optimize.AggressiveMergingPlugin(),
	new CompressionPlugin({
		asset: "[path].gz[query]",
		algorithm: "gzip",
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0.8
	}),
	HtmlWebpackPluginConfig
];

let devtool = 'none';
if (mode === 'development') {
	devtool = 'source-map';
}

module.exports = {
	mode: mode,
	entry: [
		'babel-polyfill',
		'./src/index.js'
	],
	output: {
		path: __dirname + `/public/${publicUrl}/`,
		publicPath: `/${publicUrl}/`,
		filename: '[hash].bundle.js',
		chunkFilename: "[id].[hash].bundle.js"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		}
	},
	devtool: devtool,
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
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: plugins,
	devServer: {
		historyApiFallback: true,
		contentBase: './public',
		disableHostCheck: true
	}
};
