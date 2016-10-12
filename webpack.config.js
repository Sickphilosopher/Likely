/* eslint-env node */

'use strict';

var webpack = require('webpack');
var packageJson = require('./package.json');

var isProduction = process.env.NODE_ENV === 'production';

function getLicenseComment(version) {
		return version;
}

module.exports = {
		entry: {
				likely: './source/likely.js',
				// [] is a workaround, see https://github.com/webpack/webpack/issues/300
				'likely-commonjs': ['./source/index.js'],
		},
		output: {
				filename: '[name].js',
				library: 'likely',
				libraryTarget: 'umd',
		},
		devtool: isProduction ? 'eval' : 'source-map',
		watch: !isProduction,
		plugins: isProduction ? [
				new webpack.optimize.OccurrenceOrderPlugin(),
				new webpack.optimize.DedupePlugin(),
				new webpack.optimize.UglifyJsPlugin({
						compressor: {
								// eslint-disable-next-line camelcase
								screw_ie8: true,
						},
				}),
				new webpack.BannerPlugin(getLicenseComment(packageJson.version)),
		] : [],
};
