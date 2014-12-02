
/**
 * Module dependencies.
 */

var debug = require('debug')('wpcom:request');

/**
 * Expose `Request` module
 */

exports = module.exports = {};

/**
 * Request methods
 *
 * @param {WPCOM} wpcom
 * @param {Object} def
 * @param {Object|String} params
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

exports.get = function (wpcom, def, params, query, fn) {
  def = def || {};

  // `query` is optional
  if ('function' == typeof query) {
    fn = query;
    query = {};
  }

  // `apiVersion`
  query.apiVersion = query.apiVersion || def.apiVersion;

  return wpcom.sendRequest(params, query, null, fn);
};

/**
 * Make `update` request
 *
 * @param {WPCOM} wpcom
 * @param {Object} def
 * @param {Object|String} params
 * @param {Object} [query]
 * @param {Object} body
 * @param {Function} fn
 * @api public
 */

exports.update = function (wpcom, def, params, query, body, fn) {
  def = def || {};

  if ('function' === typeof body) {
    fn = body;
    body = query;
    query = {};
  }

  query = query || {};

  // params can be s string
  params = 'string' === typeof params ? { path : params } : params;

  // `apiVersion`
  query.apiVersion = query.apiVersion || def.apiVersion;

  // request method
  params.method = 'post';

  return wpcom.sendRequest(params, query, body, fn);
};

/**
 * Make a `delete` request
 *
 * @param {WPCOM} wpcom
 * @param {Object} def
 * @param {Object|String} params
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

exports.del = function (wpcom, def, params, query, fn) {
  def = def || {};
  
  if ('function' == typeof query) {
    fn = query;
    query = {};
  }

  return exports.update(wpcom, def, params, query, null, fn);
};