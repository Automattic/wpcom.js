
/**
 * Module dependencies.
 */

var Me = require('./lib/me');
var Site = require('./lib/site');
var debug = require('debug')('wpcom');

/**
 * WordPress.com REST API class.
 *
 * @api public
 */

function WPCOM(request){
  if (!(this instanceof WPCOM)) return new WPCOM(request);
  if ('function' !== typeof request) {
    throw new TypeError('a `request` WP.com function must be passed in');
  }
  this.request = request;
  this.params = {};
}

/**
 * Get me object instance
 *
 * @api public
 */

WPCOM.prototype.me = function(){
  return new Me(this);
};

/**
 * Get site object instance
 *
 * @param {String} id
 * @api public
 */

WPCOM.prototype.site = function(id){
  return new Site(id, this);
};

/**
 * List Freshly Pressed Posts
 *
 * @param {Object} params (optional)
 * @param {Function} fn callback function
 * @api public
 */

WPCOM.prototype.freshlyPressed = function(params, fn){
  this.sendRequest('freshly-pressed.get', null, params, fn);
};

/**
 * Request to WordPress REST API
 *
 * @param {String||Object} options 
 * @param {Object} [query]
 * @param {Object} [body]
 * @param {Function} fn
 * @api private
 */

WPCOM.prototype.sendRequest = function (options, query, body, fn){
  debug('sendRequest("%s")', options.path);

  if ('string' == typeof options) {
    options = { path: options };
  }

  this.params.method = (options.method || 'GET').toUpperCase();
  this.params.path = options.path;

  if ('function' == typeof query) {
    fn = query;
    query = {};
  }

  if ('function' == typeof body) {
    fn = body;
    query = {};
  }

  if (query) this.params.query = query;
  if (body) this.params.body = body;
  if (!fn) fn = function(err){ if (err) throw err; };

  // request method
  this.request(this.params, fn);
};

/**
 * Expose `WPCOM` module
 */

module.exports = WPCOM;
