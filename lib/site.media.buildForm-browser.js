/**
 * Module dependencies.
 */
import debugFactory from 'debug';

const debug = debugFactory( 'wpcom:media' );

/**
 * Build a formData object to be sent in a POST request
 *
 * @param  {Array|File} files - array of files
 * @return {Array} formData array
 */
export default function buildFormData( files ) {
	const formData = [];
	const isArray = Array.isArray( files );
	files = isArray ? files : [ files ];

	let i, f, k, param;
	for ( i = 0; i < files.length; i++ ) {
		f = files[ i ];

		const isStream = !! f._readableState;
		const isFile = 'undefined' !== typeof File && f instanceof File;

		debug( 'isStream: %s', isStream );
		debug( 'isFile: %s', isFile );

		if ( ! isFile && ! isStream ) {
			// process file attributes like as `title`, `description`, ...
			for ( k in f ) {
				debug( 'add %o => %o', k, f[ k ] );
				if ( 'file' !== k ) {
					param = 'attrs[' + i + '][' + k + ']';
					formData.push( [ param, f[ k ] ] );
				}
			}
			// set file path
			f = f.file;
		}

		formData.push( [ 'media[]', f ] );
	}

	return formData;
}
