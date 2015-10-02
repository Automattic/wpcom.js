module.exports = {
	entry: __dirname + '/index.js',
	externals: [
		'debug',
		'fs',
		'qs',
		'wpcom-xhr-request'
	],
	output: {
		path: __dirname + '/dist',
		filename: 'index.js',
		libraryTarget: 'commonjs2',
		library: 'WPCOM'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['', '.js']
	},
	devtool: 'sourcemap'
};
