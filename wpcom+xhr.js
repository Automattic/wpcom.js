
/**
 * Module dependencies.
 */

var _WPCOM = require('./');
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
 * API authentication is done via an access `token` passed in,
 * which needs to be retrieved via OAuth (see `wpcom-oauth` on npm).
 *
 * @param {String} token OAuth API access token
 * @api public
 */

function WPCOM (token) {
  if (!(this instanceof WPCOM)) return new WPCOM(token);
  _WPCOM.call(this, request);
  this.token = token;
}
inherits(WPCOM, _WPCOM);
