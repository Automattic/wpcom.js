
/**
 * WPCOM module
 */

var WPCOM = require('../');
var Site = require('../lib/site');
var Connection = require('../lib/connection');
var util = require('./util');
var fs = require('fs');
var assert = require('assert');

/**
 * Testing data
 */

var test = require('./data');

/**
 * WPCOM instance
 */

describe('WPCOM#Site#Connection', function(){

  describe('sync', function(){

    it('should create an `Connection` instance from `Site`', function(){
      var connection = WPCOM().site().connection();
      assert.ok(connection instanceof Connection);
    });

  });

  describe('async', function(){

    describe('connection.get()', function(){
      var connection;
      before(function(done){
        var site = util.private_site();
        site.addConnection(test.connection_keyring_token_id, function(err, info){
          if (err) throw err;

          connection = info;
          done();
        });
      });

      it('should get single connection', function(done){
        var site = util.private_site();
        site.connection(connection.ID).get(function(err, info){
          if (err) throw err;

          [
            'ID',
            'keyring_token_ID',
            'site_ID',
            'user_ID',
            'shared',
            'service',
            'label'
          ].forEach(function(prop){
            assert.equal(info[prop], connection[prop]);
          });
          done();
        });
      });

    });

    describe('connection.add()', function(){

      it('should create a single connection', function(done){
        var site = util.private_site();
        site.addConnection(test.connection_keyring_token_id, function(err, info){
          if (err) throw err;

          assert.equal('number', typeof info.ID);
          assert.equal('number', typeof info.keyring_token_ID);
          assert.equal('number', typeof info.site_ID);
          assert.equal('number', typeof info.user_ID);
          assert.equal('boolean', typeof info.shared);
          assert.equal('string', typeof info.service);
          assert.equal('string', typeof info.label);

          done();
        });
      });

    });

    // @TODO: Add delete test, but this is not possible while being idempotent, since there is
    // currently no connection create endpoint

  });

});
