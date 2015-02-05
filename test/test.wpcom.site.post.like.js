
/**
 * WPCOM module
 */

var WPCOM = require('../');
var Site = require('../lib/site');
var Post = require('../lib/post');
var assert = require('assert');

/**
 * Testing data
 */

var fixture = require('./fixture');

/**
 * WPCOM instance
 */

describe('wpcom.site.post.like', function(){
  // Create `wpcom` and `site` global instances
  var wpcom = WPCOM(fixture.site.token);
  var site = wpcom.site(fixture.site.url);
  var post;

  // Create a testing_post before to start the tests
  var testing_post;
  before(function(done){
    site.addPost(fixture.post, function (err, data) {
      if (err) throw err;

      post = site.post(data.ID)
      done();
    });
  });

  after(function(done){
    // delete testing_post post
    post.delete(function(err, post) {
      if (err) throw err;

      done();
    });
  });

  describe('wpcom.site.post.like.add', function(){
    it('should add a post like', function(done){
      post
      .like()
      .add(function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.ok(data.success);
        assert.ok(data.i_like);
        assert.equal(1, data.like_count);

        done();
      });
    });
  });

  describe('wpcom.site.post.like.mine', function(){
    it('should get the post like status of mine', function(done){
      post
      .like()
      .mine(function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.equal(1, data.like_count);
        assert.ok(data.i_like);

        done();
      });
    });
  });


  describe('wpcom.site.post.like.delete', function(){
    it('should remove your like from the post', function(done){
      post
      .like()
      .del(function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.ok(data.success);
        assert.equal(0, data.like_count);
        assert.ok(!(data.i_like));

        done();
      });
    });
  });

});