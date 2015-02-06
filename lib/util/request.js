
/**
 * Module dependencies.
 */

var sendRequest = require('./send_request');
var debug = require('debug')('wpcom:request');

/**
 * Expose `Request` module
 */


function Req(wpcom) {
  this.wpcom = wpcom;
}

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

Req.prototype.get = function (def, params, query, fn) {

  // `query` is optional
  if ('function' == typeof query) {
    fn = query;
    query = {};
  }

  defaultValues(def, query);

  return sendRequest.call(this.wpcom, params, query, null, fn);
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

Req.prototype.put =
Req.prototype.post = function (def, params, query, body, fn) {
  if ('function' === typeof body) {
    fn = body;
    body = query;
    query = {};
  }

  defaultValues(def, query);

  // params can be a string
  params = 'string' === typeof params ? { path : params } : params;

  // request method
  params.method = 'post';

  return sendRequest.call(this.wpcom, params, query, body, fn);
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

Req.prototype.del = function (wpcom, def, params, query, fn) {
  if ('function' == typeof query) {
    fn = query;
    query = {};
  }

  return this.post(def, params, query, null, fn);
};

/**
 * Set query object using the given parameters
 *
 * @api private
 */

function defaultValues (def, query) {
  def = def || {};
  query = query || {};

  // `apiVersion`
  if (def.apiVersion) {
    query.apiVersion = query.apiVersion || def.apiVersion;
  }
};

/**
 * Expose module
 */

module.exports = Req;