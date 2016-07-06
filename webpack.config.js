module.exports = {
	entry: __dirname + '/build/index.js',

	node: {
		fs: 'empty'
	},

	output: {
		path: __dirname + '/dist',
		filename: 'wpcom.js',
		libraryTarget: 'var',
		library: 'WPCOM'
	},

	resolve: {
		extensions: [ '', '.js' ]
	},

	devtool: 'sourcemap'
};
