
/**
 * Module dependencies.
 */

var Me = require('./lib/me');
var Sites = require('./lib/sites');
var ends = require('./lib/endpoint');
var debug = require('debug')('wpcom');

/**
 * WordPress.com REST API class.
 *
 * @api public
 */

function WPCOM(request){
  if (!(this instanceof WPCOM)) return new WPCOM(request);
  if ('function' !== typeof request) throw new TypeError('a `request` WP.com function must be passed in');
  this.request = request;
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

WPCOM.prototype.sites = function(id){
  return new Sites(id, this);
};

/**
 * Request to WordPress REST API
 *
 * @param {String} type endpoint type
 * @param {Object} vars to build endpoint
 * @param {Object} params
 * @param {Function} fn
 * @api private
 */

WPCOM.prototype.sendRequest = function (type, vars, params, fn){
  console.log(type, vars, params);
  debug('type: `%s`', type);

  // token
  var token = params.token || this.token;
  delete params.token;

  // headers
  var headers = {};
  if (!token) {
    debug('WARN: token is not defined');
  } else {
    headers.authorization = "Bearer " + token;
  }

  // options object || callback function
  if ('function' == typeof params) {
    fn = params;
    params = {};
  }

  if (!params) params = {};
  if (!fn) fn = function(err){ if (err) throw err; };

  // endpoint config object
  var end = ends(type);
  console.log(end);

  // request method
  var method = (params.method || end.method || 'get').toLowerCase();
  delete params.method;
  debug('method: `%s`', method);

  // build endpoint url
  var endpoint = end.path;
  if (vars) {
    for (var k in vars) {
      var rg = new RegExp("%" + k + "%");
      endpoint = endpoint.replace(rg, vars[k]);
    }
  }
  params.path = endpoint;
  debug('endpoint: `%s`', endpoint);

  this.request(params, fn);
};

/**
 * Expose `WPCOM` module
 */

module.exports = WPCOM;
