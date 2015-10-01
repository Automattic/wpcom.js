require( 'babel/register' );

const defaultConfig = require( './webpack.config.js' ),
	webpack = require( 'webpack' ),
	WebpackStrip = require( 'strip-loader' );

module.exports = Object.assign( {}, defaultConfig, {
	output: {
		path: __dirname + '/dist',
		filename: 'wpcom.js',
		libraryTarget: 'umd',
		library: 'WPCOM'
	},
	loaders: [
		{
			test: /\.js$/,
			loader: WebpackStrip.loader('debug', 'console.log', 'console.warn')
		}
	],
	plugins: [
		new webpack.NormalModuleReplacementPlugin(/debug/, function() { return new Function(); })
	]
} );
