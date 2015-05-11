
/**
 * Module dependencies
 */

var WPCOM = require('../');

/**
 * Detect client/server side
 */

var is_client_side = 'undefined' !== typeof window;

/**
 * Testing data
 */

var fixture = require('./fixture');

module.exports = {
  wpcom: wpcom,
  wpcom_public: function() { return WPCOM(); }
};

function wpcom() {
  if (is_client_side) {
    var proxy = require('../node_modules/wpcom-proxy-request');
    var _wpcom = WPCOM(proxy);

    _wpcom.request({
      metaAPI: { accessAllUsersBlogs: true }
    }, function(err) {
      if (err) throw err;
      console.log('proxy now running in "access all user\'s blogs" mode');
    });

    return _wpcom;
  } else {
    // get token from environment var
    var token = process.env.TOKEN;
    return WPCOM(token);
  }
}
