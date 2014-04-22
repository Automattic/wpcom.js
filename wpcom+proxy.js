
/**
 * Module dependencies.
 */

var _WPCOM = require('./index.js');
var request = require('wpcom-proxy-request');
var inherits = require('inherits');

/**
 * Module exports.
 */

module.exports = WPCOM;

/**
 * WordPress.com REST API class.
 *
 * Utilizes the proxy <iframe> technique for API access method
 * and cookie-based authentication.
 *
 * @api public
 */

function WPCOM (token) {
  if (!(this instanceof WPCOM)) return new WPCOM(token);
  _WPCOM.call(this, request);
  this.token = token;
}
inherits(WPCOM, _WPCOM);
