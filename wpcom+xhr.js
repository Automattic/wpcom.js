
/**
 * Module dependencies.
 */

var _WPCOM = require('./index.js');
var request = require('wpcom-xhr-request');
var inherits = require('inherits');

/**
 * Module exports.
 */

module.exports = WPCOM;

/**
 * WordPress.com REST API class.
 *
 * XMLHttpRequest (and CORS) API access method.
 * API authentication is done via an (optional) access `token`,
 * which needs to be retrieved via OAuth (see `wpcom-oauth` on npm).
 *
 * @param {String} [token] OAuth API access token
 * @api public
 */

function WPCOM (token) {
  if (!(this instanceof WPCOM)) return new WPCOM(token);
  _WPCOM.call(this, request);
  this.token = token;
}

inherits(WPCOM, _WPCOM);

/**
 * Overwrite the parent `sendRequest()` function so that we can
 * add the `authToken` to every API request if it's present.
 *
 * @api private
 */

WPCOM.prototype.sendRequest = function (options, query, body, fn){
  if ('string' == typeof options) options = { path: options };

  // token
  options.token = options.token || this.token;

  return _WPCOM.prototype.sendRequest.call(this, options, query, body, fn);
};
