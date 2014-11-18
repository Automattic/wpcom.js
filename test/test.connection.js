
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

    var resetConnections = function(done){
      // Delete every site connection for this token before each test
      // NOTE: Because the token is deleted forever if no remaining sites make
      // use of it, be sure to have your `connection_keyring_token_id` in use
      // by a site other than `site.private.id`
      var site = util.private_site();
      site.connectionsList(function(err, list){
        var remaining = list.connections.length;

        if (0 === remaining) done();

        list.connections.forEach(function(conn){
          site.connection(conn.ID).del(function(){
            if (0 === --remaining) done();
          });
        });
      });
    };

    describe('connection.get()', function(){
      var connection;

      before(resetConnections);

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

      before(resetConnections);

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

    describe('connection.del()', function(){
      var connection;

      before(resetConnections);

      before(function(done){
        var site = util.private_site();
        site.addConnection(test.connection_keyring_token_id, function(err, info){
          if (err) throw err;

          connection = info;
          done();
        });
      });

      it('should delete single connection', function(done){
        var site = util.private_site();
        site.connection(connection.ID).del(function(err, info){
          if (err) throw err;

          assert.equal(connection.ID, info.ID);
          assert.equal(true, info.deleted);

          done();
        });
      });

    });

  });

});
