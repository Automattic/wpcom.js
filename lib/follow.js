
/**
 * Module dependencies.
 */

var debug = require('debug')('wpcom:like');

/**
 * Follow methods
 *
 * @param {String} site_id site id
 * @param {WPCOM} wpcom
 * @api public
 */

function Follow(site_id, wpcom){
  if (!site_id) {
    throw new Error('`site id` is not correctly defined');
  }

  if (!(this instanceof Follow)) return new Follow(site_id, wpcom);

  this.wpcom = wpcom;
  this._site_id = site_id;
}

/**
 * :FOLLOW:
 * List a site's followers
 * in reverse-chronological
 * order
 *
 */
Follow.prototype.followers = function(fn) {
  var path = '/sites/' + this._site_id + '/follows/'
  this.wpcom.sendRequest(path, null, null, fn);
};

/**
 * :FOLLOW:
 * Follow the site
 *
 */
Follow.prototype.follow = function(fn) {
  var path = '/sites/' + this._site_id + '/follows/new';
  this.wpcom.sendRequest({method: 'POST', path: path}, null, null, fn);
};

/**
 * :FOLLOW:
 * Unfollow the site
 *
 */
Follow.prototype.unfollow = function(fn) {
  var path = '/sites/' + this._site_id + '/follows/mine/delete';
  this.wpcom.sendRequest({method: 'POST', path: path}, null, null, fn);
};

/**
 * :FOLLOW:
 * Get the follow status for current 
 * user on current blog site
 *
 */
Follow.prototype.is_following = function(fn) {
  var path = '/sites/' + this._site_id + '/follows/mine';
  this.wpcom.sendRequest(path, null, null, fn);
};

module.exports = Follow;