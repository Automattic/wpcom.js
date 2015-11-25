/**
 * Module dependencies.
 */
<<<<<<< HEAD

var Like = require('./site.post.like');
var Reblog = require('./site.post.reblog');
var Comment = require('./site.comment');
var debug = require('debug')('wpcom:post');
=======
var Like = require( './site.post.like' );
var Reblog = require( './site.post.reblog' );
var Comment = require( './site.comment' );
var debug = require( 'debug' )( 'wpcom:post' );
>>>>>>> 0b58f66... stying

/**
 * Post methods
 *
 * @param {String} id - post id
 * @param {String} sid site id
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
<<<<<<< HEAD

function Post(id, sid, wpcom) {
  if (!(this instanceof Post)) {
    return new Post(id, sid, wpcom);
  }
=======
function Post( id, sid, wpcom ) {
	if ( ! ( this instanceof Post ) ) {
		return new Post( id, sid, wpcom );
	}
>>>>>>> 0b58f66... stying

  this.wpcom = wpcom;
  this._sid = sid;

  // set `id` and/or `slug` properties
  id = id || {};
  if ('object' !== typeof id) {
    this._id = id;
  } else {
    this._id = id.id;
    this._slug = id.slug;
  }
}

/**
 * Set post `id`
 *
 * @param {String} id - site id
 */
<<<<<<< HEAD

Post.prototype.id = function (id) {
  this._id = id;
=======
Post.prototype.id = function( id ) {
	this._id = id;
>>>>>>> 0b58f66... stying
};

/**
 * Set post `slug`
 *
 * @param {String} slug - site slug
 */
<<<<<<< HEAD

Post.prototype.slug = function (slug) {
  this._slug = slug;
=======
Post.prototype.slug = function( slug ) {
	this._slug = slug;
>>>>>>> 0b58f66... stying
};

/**
 * Get post
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Post.prototype.get = function (query, fn) {
  if (!this._id && this._slug) {
    return this.getBySlug(query, fn);
  }
=======
Post.prototype.get = function( query, fn ) {
	if ( ! this._id && this._slug ) {
		return this.getBySlug( query, fn );
	}
>>>>>>> 0b58f66... stying

  var path = '/sites/' + this._sid + '/posts/' + this._id;
  return this.wpcom.req.get(path, query, fn);
};

/**
 * Get post by slug
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Post.prototype.getBySlug = function (query, fn) {
  var path = '/sites/' + this._sid + '/posts/slug:' + this._slug;
  return this.wpcom.req.get(path, query, fn);
=======
Post.prototype.getBySlug = function( query, fn ) {
	var path = '/sites/' + this._sid + '/posts/slug:' + this._slug;
	return this.wpcom.req.get( path, query, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Add post
 *
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Post.prototype.add = function (query, body, fn) {
  if (undefined === fn) {
    if (undefined === body) {
      body = query;
      query = {};
    } else if ('function' === typeof body) {
      fn = body;
      body = query;
      query = {};
    }
  }

  var path = '/sites/' + this._sid + '/posts/new';

  return this.wpcom.req.post(path, query, body)
    .then(data => {
      // update POST object
      this._id = data.ID;
      debug('Set post _id: %s', this._id);

      this._slug = data.slug;
      debug('Set post _slug: %s', this._slug);

      if ('function' === typeof fn) {
        fn(null, data);
      } else {
        return Promise.resolve(data);
      }
    })
    .catch(err => {
      if ('function' === typeof fn) {
        fn(err);
      } else {
        return Promise.reject(err);
      }
    });
=======
Post.prototype.add = function( query, body, fn ) {
	if ( undefined === fn ) {
		if ( undefined === body ) {
			body = query;
			query = {};
		} else if ( 'function' === typeof body ) {
			fn = body;
			body = query;
			query = {};
		}
	}

	let path = '/sites/' + this._sid + '/posts/new';

	return this.wpcom.req.post( path, query, body )
		.then( data => {
			// update POST object
			this._id = data.ID;
			debug( 'Set post _id: %s', this._id );

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
>>>>>>> 0b58f66... stying
};

/**
 * Edit post
 *
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Post.prototype.update = function (query, body, fn) {
  var path = '/sites/' + this._sid + '/posts/' + this._id;
  return this.wpcom.req.put(path, query, body, fn);
=======
Post.prototype.update = function( query, body, fn ) {
	var path = '/sites/' + this._sid + '/posts/' + this._id;
	return this.wpcom.req.put( path, query, body, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Delete post
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 */
Post.prototype.del =
Post.prototype['delete'] = function (query, fn) {
  var path = '/sites/' + this._sid + '/posts/' + this._id + '/delete';
  return this.wpcom.req.del(path, query, fn);
};

/**
 * Restore post
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Post.prototype.restore = function (query, fn) {
  var path = '/sites/' + this._sid + '/posts/' + this._id + '/restore';
  return this.wpcom.req.put(path, query, null, fn);
=======
Post.prototype.restore = function( query, fn ) {
	var path = '/sites/' + this._sid + '/posts/' + this._id + '/restore';
	return this.wpcom.req.put( path, query, null, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Get post likes list
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Post.prototype.likesList = function (query, fn) {
  var path = '/sites/' + this._sid + '/posts/' + this._id + '/likes';
  return this.wpcom.req.get(path, query, fn);
=======
Post.prototype.likesList = function( query, fn ) {
	var path = '/sites/' + this._sid + '/posts/' + this._id + '/likes';
	return this.wpcom.req.get( path, query, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Search within a site for related posts
 *
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Post.prototype.related = function (body, fn) {
  var path = '/sites/' + this._sid + '/posts/' + this._id + '/related';
  return this.wpcom.req.put(path, body, null, fn);
=======
Post.prototype.related = function( body, fn ) {
	var path = '/sites/' + this._sid + '/posts/' + this._id + '/related';
	return this.wpcom.req.put( path, body, null, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Create a `Like` instance
 *
 * @return {Like} Like instance
 */
<<<<<<< HEAD

Post.prototype.like = function () {
  return new Like(this._id, this._sid, this.wpcom);
=======
Post.prototype.like = function() {
	return new Like( this._id, this._sid, this.wpcom );
>>>>>>> 0b58f66... stying
};

/**
 * Create a `Reblog` instance
 *
 * @return {Reblog} Reblog instance
 */
<<<<<<< HEAD

Post.prototype.reblog = function () {
  return new Reblog(this._id, this._sid, this.wpcom);
=======
Post.prototype.reblog = function() {
	return new Reblog( this._id, this._sid, this.wpcom );
>>>>>>> 0b58f66... stying
};

/**
 * Create a `Comment` instance
 *
 * @param {String} [cid] - comment id
 * @return {Comment} Comment instance
 */
<<<<<<< HEAD

Post.prototype.comment = function (cid) {
  return new Comment(cid, this._id, this._sid, this.wpcom);
=======
Post.prototype.comment = function( cid ) {
	return new Comment( cid, this._id, this._sid, this.wpcom );
>>>>>>> 0b58f66... stying
};

/**
 * Return recent comments
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Post.prototype.comments = function (query, fn) {
  var comment = new Comment(null, this._id, this._sid, this.wpcom);
  return comment.replies(query, fn);
=======
Post.prototype.comments = function( query, fn ) {
	var comment = new Comment( null, this._id, this._sid, this.wpcom );
	return comment.replies( query, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Expose `Post` module
 */
module.exports = Post;
