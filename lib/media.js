
/**
 * Module dependencies.
 */

var debug = require('debug')('wpcom:media');

/**
 * Media methods
 *
 * @param {String} id
 * @param {String} sid site id
 * @param {WPCOM} wpcom
 * @api public
 */

function Media(id, sid, wpcom){
  if (!(this instanceof Media)) return new Media(id, sid, wpcom);

  this.wpcom = wpcom;
  this._sid = sid;
  this._id = id;

  if (!this._id) {
    debug('WARN: media id is not defined');
  }
}

/**
 * Get media
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Media.prototype.get = function(query, fn){
  var params = {
    apiVersion: '1.1',
    path: '/sites/' + this._sid + '/media/' + this._id
  };

  this.wpcom.sendRequest(params, query, null, fn);
};

/**
 * Edit media
 *
 * @param {Object} body
 * @param {Function} fn
 * @api public
 */

Media.prototype.update = function(body, fn){
  var params = {
    apiVersion: '1.1',
    path: '/sites/' + this._sid + '/media/' + this._id,
    method: 'post'
  };

  this.wpcom.sendRequest(params, null, body, fn);
};

/**
 * Add media file
 *
 * @param {String|Array} files
 * @param {Function} fn
 */

Media.prototype.addFiles = function(files, fn){
  var params = {
    apiVersion: '1.1',
    path: '/sites/' + this._sid + '/media/new',
    method: 'post',
    formData: []
  };

  // process formData
  files = Array.isArray(files) ? files : [ files ];
  for (var i = 0; i < files.length; i++) {
    params.formData.push(['media[]', files[i]]);
  }

  this.wpcom.sendRequest(params, null, null, fn);
};

/**
 * Add media files from URL
 *
 * @param {String|Array} files
 * @param {Function} fn
 */

Media.prototype.addUrls = function(files, fn){
  var params = {
    apiVersion: '1.1',
    path: '/sites/' + this._sid + '/media/new',
    method: 'post'
  };

  var body = { media_urls: [] };

  // process formData
  files = Array.isArray(files) ? files : [ files ];
  for (var i = 0; i < files.length; i++) {
    body.media_urls.push(files[i]);
  }

  this.wpcom.sendRequest(params, null, body, fn);
};

/**
 * Delete media
 *
 * @param {Function} fn
 * @api public
 */

Media.prototype['delete'] =
Media.prototype.del = function(fn){
  var params = {
    apiVersion: '1.1',
    path: '/sites/' + this._sid + '/media/' + this._id + '/delete',
    method: 'post'
  };

  this.wpcom.sendRequest(params, null, null, fn);
};

/**
 * Expose `Media` module
 */

module.exports = Media;
