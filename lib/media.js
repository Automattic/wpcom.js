/**
 * Module dependencies.
 */
var fs = require( 'fs' );
var debug = require( 'debug' )( 'wpcom:media' );

/**
 * Media methods
 *
 * @param {String} id
 * @param {String} sid site id
 * @param {WPCOM} wpcom
 * @api public
 */

function Media( id, sid, wpcom ) {
	if ( ! ( this instanceof Media ) ) {
		return new Media( id, sid, wpcom );
	}

	this.wpcom = wpcom;
	this._sid = sid;
	this._id = id;

	if ( ! this._id ) {
		debug( 'WARN: media `id` is not defined' );
	}
}

/**
 * Get media
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Media.prototype.get = function( query, fn ) {
	var path = '/sites/' + this._sid + '/media/' + this._id;
	return this.wpcom.req.get( path, query, fn );
};

/**
 * Edit media
 *
 * @param {Object} [query]
 * @param {Object} body
 * @param {Function} fn
 * @api public
 */

Media.prototype.update = function( query, body, fn ) {
	var path = '/sites/' + this._sid + '/media/' + this._id;
	return this.wpcom.req.put( path, query, body, fn );
};

/**
 * Add media file
 *
 * @param {Object} [query]
 * @param {String|Object|Array} files
 * @param {Function} fn
 */

Media.prototype.addFiles = function( query, files, fn ) {
	if ( undefined === fn ) {
		if ( undefined === files ) {
			files = query;
			query = {};
		} else if ( 'function' === typeof files ) {
			fn = files;
			files = query;
			query = {};
		}
	}

	let params = {
		path: '/sites/' + this._sid + '/media/new',
		formData: []
	};

	// process formData
	files = Array.isArray( files ) ? files : [
		files
	];

	for ( let i = 0; i < files.length; i++ ) {
		let f = files[ i ];
		f = 'string' === typeof f ? fs.createReadStream( f ) : f;

		let isStream = !! f._readableState;
		let isFile = 'undefined' !== typeof File && f instanceof File;

		debug( 'is stream: %s', isStream );
		debug( 'is file: %s', isFile );

		if ( ! isFile && ! isStream ) {
			// process file attributes like as `title`, `description`, ...
			for ( let k in f ) {
				debug( 'add %o => %o', k, f[ k ] );
				if ( 'file' !== k ) {
					let param = 'attrs[' + i + '][' + k + ']';
					params.formData.push( [
						param,
						f[ k ]
					] );
				}
			}
			// set file path
			f = f.file;
			f = 'string' === typeof f ? fs.createReadStream( f ) : f;
		}

		params.formData.push( [
			'media[]',
			f
		] );
	}

	return this.wpcom.req.post( params, query, null, fn );
};

/**
 * Add media files from URL
 *
 * @param {Object} [query]
 * @param {String|Array|Object} files
 * @param {Function} fn
 */

Media.prototype.addUrls = function( query, media, fn ) {
	if ( undefined === fn ) {
		if ( undefined === media ) {
			media = query;
			query = {};
		} else if ( 'function' === typeof media ) {
			fn = media;
			media = query;
			query = {};
		}
	}

	let path = '/sites/' + this._sid + '/media/new';
	let body = {
		media_urls: []
	};

	// process formData
	media = Array.isArray( media ) ? media : [
		media
	];
	for ( let i = 0; i < media.length; i++ ) {
		let m = media[ i ],
			k, url;

		if ( 'string' === typeof m ) {
			url = m;
		} else {
			if ( ! body.attrs ) {
				body.attrs = [];
			}

			// add attributes
			body.attrs[ i ] = {};
			for ( k in m ) {
				if ( 'url' !== k ) {
					body.attrs[ i ][ k ] = m[ k ];
				}
			}
			url = m[ k ];
		}

		// push url into [media_url]
		body.media_urls.push( url );
	}

	return this.wpcom.req.post( path, query, body, fn );
};

/**
 * Delete media
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Media.prototype.delete = Media.prototype.del = function( query, fn ) {
	var path = '/sites/' + this._sid + '/media/' + this._id + '/delete';
	return this.wpcom.req.del( path, query, fn );
};

/**
 * Expose `Media` module
 */

module.exports = Media;
