
/**
 * Module dependencies.
 */

var event = require('component-event');
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
	var pinghub = this,
		params = {
			action: 'connect',
			path: '/pinghub' + path
		},
		errorCallback = function() {}, // we want an xhr, not a promise
		xhr = this.conns[path] = this.wpcom.req.get( params, errorCallback ),
		onload = function(e) {
			debug( "onload", path, e );
			fn( null, e );
		},
		onerror = function(e) {
			debug( "onerror", path, e );
			pinghub.remove( path );
			fn( e, null );
		};
    event.bind(xhr, 'load', onload);
    event.bind(xhr, 'abort', onerror);
    event.bind(xhr, 'error', onerror);
    event.bind(xhr, 'close', onerror);
};

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
