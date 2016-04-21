/**
 * Module dependencies.
 */
import Like from './site.post.like';
import Reblog from './site.post.reblog';
import Comment from './site.comment';
import Subscriber from './site.post.subscriber';
import runtimeBuilder from './util/runtime-builder';

import sitePostGetMethods from './runtime/site.post.get.json';
import SubClass from './class/subclass';
import debugFactory from 'debug';

/**
 * Module vars
 */
const debug = debugFactory( 'wpcom:post' );

/**
 * SitePost class
 */
export default class SitePost extends SubClass {
	/**
	 * SitePost methods
	 *
	 * @param {String|Object} id - post id
	 * @param {String} siteId - site id
	 * @param {WPCOM} wpcom - wpcom instance
	 */
	constructor( id = {}, siteId, wpcom ) {
		let _id, idBySlug = false;

		if ( id && typeof id === 'object' ) {
			console.warn( 'DO NOT pass an object anymore.' );
			_id = id.id || id.slug;
			if ( id.slug ) {
				idBySlug = true;
			}
		} else {
			_id = id;
		}

		super( {
			type: 'sites',
			subtype: 'posts',
			id: _id,
			idBySlug,
			baseId: siteId,
			wpcom
		} );

		this._siteId = this.baseId;
	}

	/**
	 * Set post `slug`
	 *
	 * @param {String} value - site slug
	 */
	slug( value ) {
		if ( console && console.warn ) {
			console.warn( 'DO NOT USE post.slug() anymore. Use post.slug = <value>' );
		};

		this.slug = value;
	}

	/**
	 * Get post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	get( query, fn ) {
		if ( ! this.id && this._slug ) {
			return this.getBySlug( query, fn );
		}

		return this.wpcom.req.get( this.subpath, query, fn );
	}

	/**
	 * Get post by slug
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	getBySlug( query, fn ) {
		return this.wpcom.req.get( `${this.path}/slug:${this.slug}`, query, fn );
	}

	/**
	 * Add post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	add( query, body, fn ) {
		if ( undefined === fn ) {
			if ( undefined === body ) {
				body = query;
				query = {}
			} else if ( 'function' === typeof body ) {
				fn = body;
				body = query;
				query = {}
			}
		}

		return this.wpcom.req.post( `${this.path}/new`, query, body )
			.then( data => {
				// update POST object
				this.id = data.ID;
				debug( 'Set post id: %s', this.id );

				this._slug = data.slug;
				debug( 'Set post _slug: %s', this._slug );

				if ( 'function' === typeof fn ) {
					fn( null, data );
				} else {
					return Promise.resolve( data );
				}
			} )
			.catch( err => {
				if ( 'function' === typeof fn ) {
					fn( err );
				} else {
					return Promise.reject( err );
				}
			} );
	}

	/**
	 * Restore post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	restore( query, fn ) {
		return this.wpcom.req.put( `${ this.subpath }/restore`, query, null, fn );
	}

	/**
	 * Search within a site for related posts
	 *
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	related( body, fn ) {
		return this.wpcom.req.put( `${ this.subpath }/related`, body, null, fn );
	}

	/**
	 * Create a `Comment` instance
	 *
	 * @param {String} [cid] - comment id
	 * @return {Comment} Comment instance
	 */
	comment( cid ) {
		return new Comment( cid, this.id, this._siteId, this.wpcom );
	}

	/**
	 * Return recent comments
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	comments( query, fn ) {
		var comment = new Comment( null, this.id, this._siteId, this.wpcom );
		return comment.replies( query, fn );
	}

	/**
	 * Create a `Like` instance
	 *
	 * @return {Like} Like instance
	 */
	like() {
		return new Like( this.id, this._siteId, this.wpcom );
	}

	/**
	 * Create a `Reblog` instance
	 *
	 * @return {Reblog} Reblog instance
	 */
	reblog() {
		return new Reblog( this.id, this._siteId, this.wpcom );
	}

	/**
	 * Return a `Subscriber` instance.
	 *
	 * *Example:*
	 *    // Create a Subscriber instance of a post
	 *    var post = wpcom.site( 'en.blog.wordpress.com' ).post( 1234 );
	 *    var subs = post.subscriber();
	 *
	 * @return {Subscriber} Subscriber instance
	 */
	subscriber() {
		return new Subscriber( this.id, this._siteId, this.wpcom );
	};
}

// add methods in runtime
runtimeBuilder( SitePost, sitePostGetMethods, ( item, ctx ) => {
	return `/sites/${ ctx._siteId }/posts/${ ctx.id }/${ item.subpath }`;
} );
