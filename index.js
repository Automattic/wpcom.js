/**
 * Module dependencies.
 */

var WPCOM = require('./wpcom');
var request = require('wpcom-xhr-request');
var inherits = require('inherits');

/**
 * WordPress.com REST API class.
 *
 * XMLHttpRequest (and CORS) API access method.
 *
 * API authentication is done via an (optional) access `token`,
 * which needs to be retrieved via OAuth.
 *
 * (for server-side auth, use `wpcom-oauth` on npm).
 * (for client-side auth, use `wpcom-browser-auth` on npm).
 *
 * @param {String} [token] - OAuth API access token
 * @public
 */

function XhrWPCOM(token){
  if (!(this instanceof WPCOM)) return new WPCOM(token);

  WPCOM.call(this, request);
  this.token = token;
}

inherits(XhrWPCOM, WPCOM);

/**
 * Set access token.
 *
 * @param {String} token - API token to use for requests
 * @public
 */

XhrWPCOM.prototype.setToken = function(token){
  this.token = token;
};

/**
 * Overwrite the parent `sendRequest()` function so that we can
 * add the `authToken` to every API request if it's present.
 *
 * @api private
 */

XhrWPCOM.prototype.sendRequest = function(params, query, body, fn) {
  if ('string' == typeof params) params = { path: params };
  // token
  var token = params.token || this.token;
  if (token) params.authToken = token;
  return WPCOM.prototype.sendRequest.call(this, params, query, body, fn);
};

module.exports = XhrWPCOM;
