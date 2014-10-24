
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

    var connection;
    before(function(done){
      var site = util.private_site();
      site.connectionsList(function(err, list){
        if (err) throw err;

        assert.notEqual(0, list.connections.length);

        connection = list.connections[0];
        done();
      });
    });

    describe('connection.get()', function(){

      it('should get single connection', function(done){
        var site = util.private_site();
        site.connection(connection.ID).get(function(err, info){
          if (err) throw err;

          [
            'ID',
            'token_ID',
            'conn_ID',
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

    // @TODO: Add delete test, but this is not possible while being idempotent, since there is
    // currently no connection create endpoint

  });

});
