/**
 * Module dependencies
 */
var util = require( './util' );
var assert = require( 'assert' );

describe( 'wpcom', function() {
	describe( 'wpcom.freshlyPressed', function() {
		it( 'should require freshly pressed', function( done ) {
			var wpcom = util.wpcomPublic();

			wpcom.freshlyPressed()
				.then( data => {
					// testing object
					assert.ok( data );
					assert.equal( 'number', typeof data.number );
					assert.ok( data.posts instanceof Array );
					done();
				} )
				.catch( done );
		} );
	} );

	describe( 'wpcom.plans', function() {
		describe( 'wpcom.plansList', function() {
			it( '[1] should get available WordPress.com plans', function( done ) {
				var wpcom = util.wpcomPublic();

				wpcom.plansList( { apiVersion: '1' } )
					.then( data => {
						// testing object
						assert.ok( data );
						assert.ok( data instanceof Array );
						done();
					} )
					.catch( done );
			} );

			it( '[1.2] should get available WordPress.com plans', function( done ) {
				var wpcom = util.wpcomPublic();

				wpcom.plansList( { apiVersion: '1.2' } )
					.then( data => {
						// testing object
						assert.ok( data );
						assert.ok( data instanceof Array );
						done();
					} )
					.catch( done );
			} );

			it( '[1.3] should get available WordPress.com plans', function( done ) {
				var wpcom = util.wpcomPublic();

				wpcom.plansList( { apiVersion: '1.3' } )
					.then( data => {
						// testing object
						assert.ok( data );
						assert.ok( data instanceof Array );
						done();
					} )
					.catch( done );
			} );
		} );

		describe( 'wpcom.plansFeatures', function() {
			it( '[1] should get available WordPress.com features', function( done ) {
				var wpcom = util.wpcomPublic();

				wpcom.plansFeatures( { apiVersion: '1' } )
					.then( data => {
						// testing object
						assert.ok( data );
						assert.ok( data instanceof Array );
						done();
					} )
					.catch( done );
			} );

			it( '[1.2] should get available WordPress.com plans', function( done ) {
				var wpcom = util.wpcomPublic();

				wpcom.plansFeatures( { apiVersion: '1.2' } )
					.then( data => {
						// testing object
						assert.ok( data );
						assert.ok( data instanceof Array );
						done();
					} )
					.catch( done );
			} );
		} );
	} );
} );
