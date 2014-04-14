
/**
 * Module dependencies
 */

var test = require('./data');
var WPCOM = require('../');

/**
 * `Util` module
 */

function Util(){}

/**
 * Create a WPCOM instance
 *
 * @api public
 */

Util.wpcom = function(){
  return WPCOM(test.token);
};

/**
 * Create a new WPCOM instance
 * Create a site instance object
 *
 * @api public
 */

Util.public_site = function(){
  var wpcom = WPCOM(test.token);
  return wpcom.site(test.public_site);
};

/**
 * Create a new WPCOM instance
 * setting with a private site id
 *
 * @api public
 */

Util.private_site = function(){
  var wpcom = WPCOM(test.token);
  wpcom.site.id(test.private_site);
  return wpcom;
};

/**
 * Export module
 */

module.exports = Util;
