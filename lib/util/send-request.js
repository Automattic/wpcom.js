/**
 * Module dependencies
 */
import qs from 'qs';
import debugFactory from 'debug';

const debug = debugFactory( 'wpcom:send-request' );
const debug_res = debugFactory( 'wpcom:send-request:res' );

export const apiVersionPattern = /^(?:(\d+)\.)?(\d+)$/;
export const apiNamespacePattern = /^(?:([a-z]+)\/)?v(\d+)$/;

/**
 * Request to WordPress REST API
 *
 * @param {String|Object} params - params object
 * @param {Object} [query] - query object parameter
 * @param {Object} [body] - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
export default function sendRequest( params, query, body, fn ) {
	// `params` can be just the path ( String )
	params = 'string' === typeof params ? { path: params } : params;

	debug( 'sendRequest(%o )', params.path );

	// set `method` request param
	params.method = ( params.method || 'get' ).toUpperCase();

	// `query` is optional
	if ( 'function' === typeof query ) {
		fn = query;
		query = {};
	}

	// `body` is optional
	if ( 'function' === typeof body ) {
		fn = body;
		body = null;
	}

	// query could be `null`
	query = query || {};

	const { apiVersion, apiNamespace } = query;

	if ( typeof apiVersion !== 'undefined' && typeof apiNamespace !== 'undefined' ) {
		throw new Error( 'apiVersion and apiNamespace cannot be simultaneously defined.' );
	}

	if ( typeof apiVersion === 'undefined' ) {
		if ( typeof apiNamespace === 'undefined' ) {
			// set apiVersion default value
			params.apiVersion = this.apiVersion;
		} else {
			params.apiNamespace = apiNamespace;
			delete query.apiNamespace;
		}
	} else {
		params.apiVersion = apiVersion;
		delete query.apiVersion;
	}

	// check apiVersion shape
	if ( params.apiVersion && ! apiVersionPattern.test( params.apiVersion ) ) {
		throw new Error( `'{ apiVersion: '${ params.apiVersion }' } value is invalid.` );
	}

	// check apiNamespace shape`
	if ( params.apiNamespace && ! apiNamespacePattern.test( params.apiNamespace ) ) {
		throw new Error( `'{ apiNamespace: '${ params.apiNamespace }' } value is invalid.` );
	}

	// - `proxyOrigin`
	if ( query.proxyOrigin ) {
		params.proxyOrigin = query.proxyOrigin;
		debug( 'proxyOrigin: %o', params.proxyOrigin );
		delete query.proxyOrigin;
	}

	// Stringify query object before to send
	query = qs.stringify( query, { arrayFormat: 'brackets' } );

	// pass `query` and/or `body` to request params
	params.query = query;

	if ( body ) {
		params.body = body;
	}
	debug( 'params: %o', params );

	// if callback is provided, behave traditionally
	if ( 'function' === typeof fn ) {
		// request method
		return this.request( params, function( err, res ) {
			debug_res( res );
			fn( err, res );
		} );
	}

	// but if not, return a Promise
	return new Promise( ( resolve, reject ) => {
		this.request( params, ( err, res ) => {
			debug_res( res );
			err ? reject( err ) : resolve( res );
		} );
	} );
}
