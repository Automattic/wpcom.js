
/**
 * Module dependencies
 */

var WPCOM = require('../');
var Site = require('../lib/site');
var assert = require('assert');

/**
 * Fixture
 */

var fixture = require('./fixture');

/**
 * Sync tests
 */

describe('fixture', function() {

  describe('general', function() {
    it('`public_site` should be defined', function(){
      assert.equal('string', typeof fixture.site.public.url);
    });

    it('`private_site` should be defined', function() {
      assert.equal('string', typeof fixture.site.private.url);
      assert.equal('number', typeof fixture.site.private.id);
      assert.equal('string', typeof fixture.site.private.token);
    });

    it('`post` should be ok', function() {
      assert.ok(fixture.post);
      assert.equal('object', typeof fixture.post);

      assert.equal('string', typeof fixture.post.title);
      assert.equal('string', typeof fixture.post.content);
    });
  });
});