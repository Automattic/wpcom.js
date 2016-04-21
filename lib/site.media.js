/**
 * Module dependencies.
 */

import SubClass from './class/subclass';
import fs from 'fs';
import debugFactory from 'debug';

/**
 * Modules vars
 */
const debug = debugFactory( 'wpcom:media' );

/**
 * Media Class
 */
export default class Media extends SubClass {
	/**
	 * Constructor
	 *
	 * @param {String} id - media id
	 * @param {String} siteId site id
	 * @param {WPCOM} wpcom - wpcom instance
	 */
	constructor( id, siteId, wpcom ) {
		super( {
			type: 'sites',
			subtype: 'media',
			id,
			baseId: siteId,
			wpcom
		} );

		this._siteId = siteId;
	}

	/**
	 * Add media file
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {String|Object|Array} files - files to add
	 * @param {Function} fn - callback function
	 * @return {Promise} Promise
	 */
	addFiles( query, files, fn ) {
		if ( undefined === fn ) {
			if ( undefined === files ) {
				files = query;
				query = {}
			} else if ( 'function' === typeof files ) {
				fn = files;
				files = query;
				query = {}
			}
		}

		let params = {
			path: '/sites/' + this._siteId + '/media/new',
			formData: []
		}

		// process formData
		files = Array.isArray( files ) ? files : [ files ];

		let i, f, isStream, isFile, k, param;
		for ( i = 0; i < files.length; i++ ) {
			f = files[i];
			f = 'string' === typeof f ? fs.createReadStream( f ) : f;

			isStream = !! f._readableState;
			isFile = 'undefined' !== typeof File && f instanceof File;

			debug( 'is stream: %s', isStream );
			debug( 'is file: %s', isFile );

			if ( ! isFile && ! isStream ) {
				// process file attributes like as `title`, `description`, ...
				for ( k in f ) {
					debug( 'add %o => %o', k, f[k] );
					if ( 'file' !== k ) {
						param = 'attrs[' + i + '][' + k + ']';
						params.formData.push( [ param, f[k] ] );
					}
				}
				// set file path
				f = f.file;
				f = 'string' === typeof f ? fs.createReadStream( f ) : f;
			}

			params.formData.push( [ 'media[]', f ] );
		}

		return this.wpcom.req.post( params, query, null, fn );
	}

	/**
	 * Add media files from URL
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {String|Array|Object} media - files to add
	 * @param {Function} fn - callback function
	 * @return {Promise} Promise
	 */
	addUrls( query, media, fn ) {
		if ( undefined === fn ) {
			if ( undefined === media ) {
				media = query;
				query = {}
			} else if ( 'function' === typeof media ) {
				fn = media;
				media = query;
				query = {}
			}
		}

		let path = '/sites/' + this._siteId + '/media/new';
		let body = { media_urls: [] }

		// process formData
		let i, m, url, k;

		media = Array.isArray( media ) ? media : [ media ];
		for ( i = 0; i < media.length; i++ ) {
			m = media[i];

			if ( 'string' === typeof m ) {
				url = m;
			} else {
				if ( ! body.attrs ) {
					body.attrs = [];
				}

				// add attributes
				body.attrs[i] = {}
				for ( k in m ) {
					if ( 'url' !== k ) {
						body.attrs[i][k] = m[k];
					}
				}
				url = m.url;
			}

			// push url into [media_url]
			body.media_urls.push( url );
		}

		return this.wpcom.req.post( path, query, body, fn );
	}
}
