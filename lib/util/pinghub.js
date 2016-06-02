
/**
 * Module dependencies.
 */

var debug = require('debug')('wpcom:pinghub');


/**
 * Create a `Pinghub` instance
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @return {null} null
 * @api public
 */
function Pinghub( wpcom ) {
	if ( ! ( this instanceof Pinghub ) ) {
		return new Pinghub( wpcom );
	}

	this.wpcom = wpcom;
	this.conns = {};
}

/**
 * Open a websocket to Pinghub
 *
 * @param {String} path
 * @param {Function} fn
 * @api public
 */
Pinghub.prototype.connect = function( path, fn ) {
	debug("connect", path, fn);

	const params = {
		action: 'connect',
		path: `/pinghub${ path }`
	};

	let xhr = {};

	try {
		xhr = this.wpcom.req.get( params, () => null );
	} catch ( e ) { }

	xhr.onload = data => {
		debug( "onload", path, data );
		fn( null, data );
	};

	const finishConnection = method => error => {
		debug( method, path, error );
		this.remove( path );
		fn( error, null );
	};

	xhr.onerror = finishConnection( 'onerror' );
	xhr.onabort = finishConnection( 'onabort' );
	xhr.onclose = finishConnection( 'onclose' );

	this.conns[ path ] = xhr;
};

/**
 * Close a websocket connection (unsubscribe)
 *
 * @param {String} path
 * @api public
 */
Pinghub.prototype.disconnect = function( path ) {
	debug("disconnect", path);
	var params = {
			action: 'disconnect',
			path: '/pinghub' + path
		},
		errorCallback = function() {}; // no promises
	this.wpcom.req.get( params, errorCallback );
}

/**
 * Remove a dead connection
 *
 * @param {String} path - pinghub channel
 * @api private
 */
Pinghub.prototype.remove = function( path ) {
	debug("remove", path);
	delete this.conns[path];
};

/**
 * Expose `Pinghub` module
 */
module.exports = Pinghub;
