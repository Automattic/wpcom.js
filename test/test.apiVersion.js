
/**
 * Module dependencies
 */

var WPCOM = require('../');
var assert = require('assert');

/**
 * Fixture data
 */

var fixture = require('./fixture');

/**
 * Create a `Site` instance
 */

describe('apiVersion', function() {

  it('should request changing api version', function(done) {

    var wpcom = WPCOM(fixture.site.private.token);
    var site = wpcom.site(fixture.site.private.url);

    site
    .addMediaUrls({ apiVersion: '1.1' }, fixture.media.urls[1],
    function(err, data){
      if (err) throw err;

      assert.ok(data);

      site
      .mediaList({ apiVersion: '1' }, function(err, data) {
        if (err) throw err;

        site
        .addMediaFiles({ apiVersion: '1.1' }, fixture.media.files[0],
        function(err, data) {
          if (err) throw err;

          assert.ok(data);
          done();
        });
      });
    });
  });

});
