/**
 * Module dependencies.
 */
<<<<<<< HEAD

var CommentLike = require('./site.comment.like');
=======
var commentLike = require( './site.comment.like' );
>>>>>>> 0b58f66... stying

/**
 * Comment methods
 *
 * @param {String} [cid] comment id
 * @param {String} [pid] post id
 * @param {String} sid site id
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
<<<<<<< HEAD

function Comment(cid, pid, sid, wpcom) {
  if (!sid) {
    throw new Error('`site id` is not correctly defined');
  }
=======
function Comment( cid, pid, sid, wpcom ) {
	if ( ! sid ) {
		throw new Error( '`site id` is not correctly defined' );
	}
>>>>>>> 0b58f66... stying

  if (!(this instanceof Comment)) {
    return new Comment(cid, pid, sid, wpcom);
  }

  this.wpcom = wpcom;
  this._cid = cid;
  this._pid = pid;
  this._sid = sid;
}

/**
 * Return a single Comment
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Comment.prototype.get = function (query, fn) {
  var path = '/sites/' + this._sid + '/comments/' + this._cid;
  return this.wpcom.req.get(path, query, fn);
=======
Comment.prototype.get = function( query, fn ) {
	var path = '/sites/' + this._sid + '/comments/' + this._cid;
	return this.wpcom.req.get( path, query, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Return recent comments for a post
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Comment.prototype.replies = function (query, fn) {
  var path = '/sites/' + this._sid + '/posts/' + this._pid + '/replies/';
  return this.wpcom.req.get(path, query, fn);
=======
Comment.prototype.replies = function( query, fn ) {
	var path = '/sites/' + this._sid + '/posts/' + this._pid + '/replies/';
	return this.wpcom.req.get( path, query, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Create a comment on a post
 *
 * @param {Object} [query] - query object parameter
 * @param {String|Object} body - body parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Comment.prototype.add = function (query, body, fn) {
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

  body = 'string' === typeof body ? { content: body } : body;

  var path = '/sites/' + this._sid + '/posts/' + this._pid + '/replies/new';
  return this.wpcom.req.post(path, query, body, fn);
=======
Comment.prototype.add = function( query, body, fn ) {
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

	body = 'string' === typeof body ? { content: body } : body;

	let path = '/sites/' + this._sid + '/posts/' + this._pid + '/replies/new';
	return this.wpcom.req.post( path, query, body, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Edit a comment
 *
 * @param {Object} [query] - query object parameter
 * @param {String|Object} body - body parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Comment.prototype.update = function (query, body, fn) {
  if ('function' === typeof body) {
    fn = body;
    body = query;
    query = {};
  }
=======
Comment.prototype.update = function( query, body, fn ) {
	if ( 'function' === typeof body ) {
		fn = body;
		body = query;
		query = {};
	}
>>>>>>> 0b58f66... stying

  body = 'string' === typeof body ? { content: body } : body;

  var path = '/sites/' + this._sid + '/comments/' + this._cid;
  return this.wpcom.req.put(path, query, body, fn);
};

/**
 * Create a Comment as a reply to another Comment
 *
 * @param {Object} [query] - query object parameter
 * @param {String|Object} body - body parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Comment.prototype.reply = function (query, body, fn) {
  if ('function' === typeof body) {
    fn = body;
    body = query;
    query = {};
  }
=======
Comment.prototype.reply = function( query, body, fn ) {
	if ( 'function' === typeof body ) {
		fn = body;
		body = query;
		query = {};
	}
>>>>>>> 0b58f66... stying

  body = 'string' === typeof body ? { content: body } : body;

  var path = '/sites/' + this._sid + '/comments/' + this._cid + '/replies/new';
  return this.wpcom.req.post(path, query, body, fn);
};

/**
 * Delete a comment
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Comment.prototype.del =
Comment.prototype['delete'] = function (query, fn) {
  var path = '/sites/' + this._sid + '/comments/' + this._cid + '/delete';
  return this.wpcom.req.del(path, query, fn);
};

/**
 * Create a `CommentLike` instance
 *
 * @return {CommentLink} CommentLink instance
 */
<<<<<<< HEAD

Comment.prototype.like = function () {
  return CommentLike(this._cid, this._sid, this.wpcom);
=======
Comment.prototype.like = function() {
	return commentLike( this._cid, this._sid, this.wpcom );
>>>>>>> 0b58f66... stying
};

/**
 * Get comment likes list
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Comment.prototype.likesList = function (query, fn) {
  var path = '/sites/' + this._sid + '/comments/' + this._cid + '/likes';
  return this.wpcom.req.get(path, query, fn);
=======
Comment.prototype.likesList = function( query, fn ) {
	var path = '/sites/' + this._sid + '/comments/' + this._cid + '/likes';
	return this.wpcom.req.get( path, query, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Expose `Comment` module
 */
module.exports = Comment;
