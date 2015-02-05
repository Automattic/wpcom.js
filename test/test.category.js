
/**
 * WPCOM module
 */

var WPCOM = require('../');
var Site = require('../lib/site');
var Category = require('../lib/category');
var assert = require('assert');

/**
 * Testing data
 */

var fixture = require('./fixture');


describe('site.category', function() {
  // Create `wpcom` and `site` global instances
  var wpcom = WPCOM(fixture.site.private.token);
  var site = wpcom.site(fixture.site.private.url);

  // global var to store category added
  var testing_category;

  // Create a new_category before to start tests
  var new_category;
  before(function(done){
    site.category()
    .add(fixture.category, function(err, category) {
      if (err) throw err;

      new_category = category;
      done();
    });
  });

  after(function(done){
    site.category(new_category.slug)
    .delete(function(err, category) {
      if (err) throw err;

      done();
    });
  });

  
  describe('site.category.get()', function(){

    it('should get added category', function(done){
      site.category(new_category.slug)
      .get(function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.ok(data instanceof Object, 'data is not an object');
        assert.equal(new_category.slug, data.slug);
        assert.equal(new_category.name, data.name);
        done();
      });
    });
  });

  describe('site.category.add()', function(){

    it('should add a new category', function(done){
      var category = site.category();

      fixture.category.name += '- Added';
      category.add(fixture.category, function(err, data){
        if (err) throw err;

        // checking some data date
        assert.ok(data);
        assert.ok(data instanceof Object, 'data is not an object');

        // store added catogory
        testing_category = data;

        done();
      });
    });
  });

  describe('site.category.update()', function(){

    it('should edit the new added category', function(done){
      var category = site.category(testing_category.slug);
      var new_name = 'new category name';

      category.update({ name: new_name }, function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.equal(new_name, data.name);

        // update added category
        testing_category = data;

        done();
      });
    });
  });

  describe('site.category.delete()', function(){

    it('should delete the new added category', function(done){
      site.category(testing_category.slug)
      .delete(function(err, data){
        if (err) throw err;

        assert.ok(data);
        assert.equal('true', data.success);
        assert.equal(testing_category.slug, data.slug);

        done();
      });
    });
  });

});