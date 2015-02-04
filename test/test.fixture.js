
/**
 * Module dependencies
 */

var WPCOM = require('../');
var Site = require('../lib/site');
var assert = require('assert');

/**
 * Package
 */

var pkg = require('../package.json');

/**
 * Testing data
 */

var fixture = require('./fixture');

/**
 * Sync tests
 */

describe('data', function(){
  describe('package', function(){
    it('version should have x.x.x format', function(){
      assert.ok((pkg.version).match(/\d\.\d\.\d/));
    });
  });

  describe('fixture', function(){
    it('`public_site` should be defined', function(){
      assert.equal('string', typeof fixture.site.public.url);
    });

    it('`private_site` should be defined', function(){
      assert.equal('string', typeof fixture.site.private.url);
      assert.equal('number', typeof fixture.site.private.id);
      assert.equal('string', typeof fixture.site.private.token);
    });

    it('`post` should be ok', function(){
      assert.ok(fixture.post);
      assert.equal('object', typeof fixture.post);

      assert.equal('string', typeof fixture.post.title);
      assert.equal('string', typeof fixture.post.content);
    });
  });
});
