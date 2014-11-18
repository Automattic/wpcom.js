
/**
 * Module dependencies.
 */

var fs = require('fs');
var debug = require('debug')('wpcom:connection');

/**
 * Connection methods
 *
 * @param {String} id
 * @param {String} sid site id
 * @param {WPCOM} wpcom
 * @api public
 */

function Connection(id, sid, wpcom){
  if (!(this instanceof Connection)) return new Connection(id, sid, wpcom);

  this.wpcom = wpcom;
  this._sid = sid;
  this._id = id;

  if (!this._id) {
    debug('WARN: connection `id` is not defined');
  }
}

Connection.defaultApiVersion = '1.1';

/**
 * Get connection
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Connection.prototype.get = function(query, fn){
  var params = {
    apiVersion: query.apiVersion || Connection.defaultApiVersion,
    path: '/sites/' + this._sid + '/publicize-connections/' + this._id
  };

  return this.wpcom.sendRequest(params, query, null, fn);
};

/**
 * Add connection
 *
 * @param {Object|Number} body Token ID or form body object to send
 * @param {Function} fn
 */

Connection.prototype.add = function(body, fn){
  if ('number' === typeof body) {
    body = { keyring_token_ID: body };
  } else if ('undefined' === typeof body) {
    body = {};
  }

  var path = '/sites/' + this._sid + '/publicize-connections/new';
  return this.wpcom.sendRequest({
    apiVersion: body.apiVersion || Connection.defaultApiVersion,
    path: path,
    method: 'post'
  }, null, body, fn);
};

/**
 * Delete connection
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Connection.prototype['delete'] =
Connection.prototype.del = function(query, fn){
  if ('function' == typeof query) {
    fn = query;
    query = {};
  }

  var params = {
    apiVersion: query.apiVersion || Connection.defaultApiVersion,
    path: '/sites/' + this._sid + '/publicize-connections/' + this._id + '/delete',
    method: 'post'
  };

  return this.wpcom.sendRequest(params, query, null, fn);
};

/**
 * Expose `Connection` module
 */

module.exports = Connection;
