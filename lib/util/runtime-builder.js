/**
 * Module dependencies
 */
import methodBuilder from './runtime-method';

/**
 * Add a method defined through of the given name, and subpath (optional)
 * to the given prototype.
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @param {*} Class - class to extend
 * @param {Array} list - methods list
 * @param {String} [subpath] - endpoint subpath
 */
export default function( wpcom, Class, list ) {
	list.forEach( item => {
		item = 'object' === typeof item ? item : { name: item }
		methodBuilder( wpcom, Class.prototype, item.name, item.subpath );
	} );
};
