
/**
 * Module dependencies.
 */

var Post = require('./post');
var debug = require('debug')('wpcom:site');

/**
 * Create a Site instance
 *
 * @param {WPCOM} wpcom
 * @api public
 */

function Site(id, wpcom){
  if (!(this instanceof Site)) return new Site(id, wpcom);
  this.wpcom = wpcom;

  debug('set `%s` site id', id);
  this._id = id;
}

/**
 * Require site information
 *
 * @param {Object} [params]
 * @param {Function} fn
 * @api public
 */

Site.prototype.get = function(params, fn){
  if (!this._id) {
    return fn(new Error('site `id` is not defined'));
  }

  this.wpcom.req.send('site.get', { site: this._id }, params, fn);
};

/**
 * Require posts site
 *
 * @param {Object} [params]
 * @param {Function} fn
 * @api public
 */

Site.prototype.posts = function(params, fn){
  if (!this._id) {
    return fn(new Error('site `id` is not defined'));
  }

  this.wpcom.req.send('posts.get', { site: this._id }, params, fn);
};

/**
 * Create a `Post` instance
 *
 * @param {String} id
 * @api public
 */

Site.prototype.post = function(id){
  return Post(id, this._id, this.wpcom);
};

/**
 * Add a new blog post to Blog
 *
 * @param {Object} data
 * @param {Function} fn
 * @return {Post} new post instance
 */

Site.prototype.addPost = function(data, fn){
  var post = Post(null, this._id, this.wpcom);
  post.add(data, fn);
  return post;
};

/**
 * Expose `Site` module
 */

module.exports = Site;
