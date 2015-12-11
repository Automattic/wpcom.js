/**
 * Module dependencies
 */
import debugFactory from 'debug';

const debug = debugFactory( 'wpcom:builder' );

/**
 * Add a method defined through of the given name, and subpath (optional)
 * to the given prototype.
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @param {Proto} _proto_ - Class prototype
 * @param {name} name - method name
 * @param {String} [subpath] - endpoint subpath
 */
export default function( wpcom, _proto_, name, subpath ) {
	_proto_[ name ] = function( query, fn ) {
		var path = '/sites/' + this._id + '/' + subpath;
		return wpcom.req.get( path, query, fn );
	};

	debug( 'add %o - subpath: %o', name, subpath );
};
