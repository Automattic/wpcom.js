/**
 * Module dependencies.
 */
import debugFactory from 'debug';
import buildFormData from './site.media.buildForm-node.js';
const debug = debugFactory( 'wpcom:media' );


/**
 * Media methods
 *
 * @param {String} id - media id
 * @param {String} sid site id
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
export default function Media( id, sid, wpcom ) {
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
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.get = function( query = {}, fn ) {
	query.apiVersion = query.apiVersion || '1.2';
	const path = '/sites/' + this._sid + '/media/' + this._id;
	return this.wpcom.req.get( path, query, fn );
};

/**
 * Update media
 *
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.update = function( query, body, fn ) {
	const params = { path: '/sites/' + this._sid + '/media/' + this._id };
	return this.wpcom.req.put( params, query, body, fn );
};

/**
 * Edit media
 *
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.edit = function( query, body, fn ) {
	if ( typeof body == 'function' || ! body ) {
		fn = body;
		body = query;
		query = {};
	}

	const params = { path: '/sites/' + this._sid + '/media/' + this._id + '/edit' };

	if ( body && body.media ) {
		params.formData = [ [ 'media', body.media ] ];
		delete body.media;

		for ( const k in body ) {
			params.formData.push( [ `attrs[${ k }]`, body[ k ] ] );
		}

		body = null;
	}

	return this.wpcom.req.put( params, query, body, fn );
};

/**
 * Add media file
 *
 * @param {Object} [query] - query object parameter
 * @param {String|Object|Array} files - files to add
 * @param {Function} fn - callback function
 * @return {Function} request handler
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

	const params = {
		path: '/sites/' + this._sid + '/media/new',
		formData: buildFormData( files )
	};

	return this.wpcom.req.post( params, query, null, fn );
};

/**
 * Add media files from URL
 *
 * @param {Object} [query] - query object parameter
 * @param {String|Array|Object} media - files to add
 * @param {Function} fn - callback function
 * @return {Function} request handler
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

	const path = '/sites/' + this._sid + '/media/new';
	const body = { media_urls: [] };

	// process formData
	let i, m, url, k;

	media = Array.isArray( media ) ? media : [ media ];
	for ( i = 0; i < media.length; i++ ) {
		m = media[ i ];

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
			url = m.url;
		}

		// push url into [media_url]
		body.media_urls.push( url );
	}

	return this.wpcom.req.post( path, query, body, fn );
};

/**
 * Delete media
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.delete = Media.prototype.del = function( query, fn ) {
	const path = '/sites/' + this._sid + '/media/' + this._id + '/delete';
	return this.wpcom.req.del( path, query, fn );
};
