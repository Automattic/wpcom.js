
/**
 * Module dependencies.
 */

var events = require('events');
var util = require('util');

var Me = require('./lib/me');
var Site = require('./lib/site');
var req = require('./lib/req');
var debug = require('debug')('wpcom');

/**
 * Alias
 */

var Emitter = events.EventEmitter;

/**

/**
 * WordPress REST-API class
 *
 * @param {String} [token]
 * @api public
 */

function WPCOM(token){
  if (!(this instanceof WPCOM)) return new WPCOM(token);

  this.tkn = token;

  // request instance
  this.req = new req(this);
}

/**
 * Inherit from Emitter
 */

util.inherits(WPCOM, Emitter);

/**

/**
 * Get me object instance
 *
 * @api public
 */

WPCOM.prototype.me = function(){
  return Me(this);
};

/**
 * Get site object instance
 *
 * @param {String} id
 * @api public
 */

WPCOM.prototype.site = function(id){
  return Site(id, this);
};

/**
 * Expose `WPCOM` module
 */

module.exports = WPCOM;
