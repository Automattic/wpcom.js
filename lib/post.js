
/**
 * Module dependencies.
 */

var Like = require('./like');
var Reblog = require('./reblog');
var Comment = require('./comment');
var debug = require('debug')('wpcom:post');

/**
 * Module variables
 */
var _id, _sid, _slug, _wpcom;

/**
 * Post methods
 *
 * @param {String} id
 * @param {String} sid site id
 * @param {WPCOM} wpcom
 * @api public
 */

function Post(id, sid, wpcom) {
  if (!(this instanceof Post)) {
    return new Post(id, sid, wpcom);
  }

  _wpcom = wpcom;
  this.wpcom = _wpcom;

  _sid = sid;
  this._sid = _sid;

  // set `id` and/or `slug` properties
  id = id || {};
  if ('object' !== typeof id) {
    _id = id;
    this.id = _id;
  } else {
    _id = id.id;
    this._id = _id;
    _slug = id.slug;
    this._slug = _slug;
  }
}

/**
 * Set post `id`
 *
 * @param {String} id
 * @api public
 */

Post.prototype.id = function (id) {
  _id = id;
  this._id = _id;
};

/**
 * Set post `slug`
 *
 * @param {String} slug
 * @api public
 */

Post.prototype.slug = function (slug) {
  _slug = slug;
  this._slug = _slug;
};

/**
 * Get post
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Post.prototype.get = function (query, fn) {
  if (!_id && _slug) {
    return this.getBySlug(query, fn);
  }

  var path = '/sites/' + _sid + '/posts/' + _id;
  return _wpcom.req.get(path, query, fn);
};

/**
 * Get post by slug
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Post.prototype.getBySlug = function (query, fn) {
  var path = '/sites/' + _sid + '/posts/slug:' + _slug;
  return _wpcom.req.get(path, query, fn);
};

/**
 * Add post
 *
 * @param {Object} [query]
 * @param {Object} body
 * @param {Function} fn
 * @api public
 */

Post.prototype.add = function (query, body, fn) {
  if ('function' === typeof body) {
    fn = body;
    body = query;
    query = {};
  }

  var path = '/sites/' + _sid + '/posts/new';
  return _wpcom.req.post(path, query, body, function (err, data) {
    if (err) {
      return fn(err);
    }

    // update POST object
    _id = data.ID;
    this._id = _id;
    debug('Set post _id: %s', _id);

    _slug = data.slug;
    this._slug = _slug;
    debug('Set post _slug: %s', _slug);

    fn(null, data)
  }.bind(this));
};

/**
 * Edit post
 *
 * @param {Object} [query]
 * @param {Object} body
 * @param {Function} fn
 * @api public
 */

Post.prototype.update = function (query, body, fn) {
  var path = '/sites/' + _sid + '/posts/' + _id;
  return _wpcom.req.put(path, query, body, fn);
};

/**
 * Delete post
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Post.prototype.del =
Post.prototype['delete'] = function (query, fn) {
  var path = '/sites/' + _sid + '/posts/' + _id + '/delete';
  return _wpcom.req.del(path, query, fn);
};

/**
 * Restore post
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Post.prototype.restore = function (query, fn) {
  var path = '/sites/' + _sid + '/posts/' + _id + '/restore';
  return _wpcom.req.put(path, query, null, fn);
};

/**
 * Get post likes list
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Post.prototype.likesList = function (query, fn) {
  var path = '/sites/' + _sid + '/posts/' + _id + '/likes';
  return _wpcom.req.get(path, query, fn);
};

/**
 * Search within a site for related posts
 *
 * @param {Object} body
 * @param {Function} fn
 * @api public
 */

Post.prototype.related = function (body, fn) {
  var path = '/sites/' + _sid + '/posts/' + _id + '/related';
  return _wpcom.req.put(path, body, null, fn);
};

/**
 * Create a `Like` instance
 *
 * @api public
 */

Post.prototype.like = function () {
  return new Like(_id, _sid, _wpcom);
};

/**
 * Create a `Reblog` instance
 *
 * @api public
 */

Post.prototype.reblog = function () {
  return new Reblog(_id, _sid, _wpcom);
};

/**
 * Create a `Comment` instance
 *
 * @param {String} [cid] comment id
 * @api public
 */

Post.prototype.comment = function (cid) {
  return new Comment(cid, _id, _sid, _wpcom);
};

/**
 * Return recent comments
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Post.prototype.comments = function (query, fn) {
  var comment = new Comment(null, _id, _sid, _wpcom);
  return comment.replies(query, fn);
};

/**
 * Expose `Post` module
 */

module.exports = Post;
