

/**
 * Module dependencies.
 */

var debug = require('debug')('wpcom:comment');

/**
 * Comment methods
 *
 * @param {String} [cid] comment id
 * @param {String} [pid] post id
 * @param {String} sid site id
 * @param {WPCOM} wpcom
 * @api public
 */

function Comment(cid, pid, sid, wpcom){
  if (!sid) {
    throw new Error('`side id` is not correctly defined');
  }

  if (!(this instanceof Comment)) return new Comment(cid, pid, sid, wpcom);

  this.wpcom = wpcom;
  this._cid = cid;
  this._pid = pid;
  this._sid = sid;
}

/**
 * Return a single Comment
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Comment.prototype.get = function(query, fn){
  var path = '/sites/' + this._sid + '/comments/' + this._cid;
  this.wpcom.sendRequest(path, query, null, fn);
};

/**
 * Return recent comments for a post
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Comment.prototype.replies = function(query, fn){
  var path = '/sites/' + this._sid + '/posts/' + this._pid + '/replies/';
  this.wpcom.sendRequest(path, query, null, fn);
};

/**
 * Expose `Comment` module
 */

module.exports = Comment;
