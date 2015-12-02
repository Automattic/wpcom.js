
/**
 * Module dependencies
 */
var util = require( './util' );
var assert = require( 'assert' );

/**
 * me.connectedApps
 */
describe( 'wpcom.me.connectedApps', function() {
	// Global instances
	var wpcom = util.wpcom();
	var me = wpcom.me();
	var appId;

	describe( 'wpcom.me.connectedApps', function() {
		it( 'should get current user\' connected applications', function( done ) {
			me.connectedApps( function( err, data ) {
				if ( err ) throw err;

				assert.ok( data );
				assert.ok( data.connected_applications );

				appId = data.connected_applications && data.connected_applications[0]
					? data.connected_applications[0].ID
					: null;

				if ( appId ) {
					describe( 'wpcom.me.connectedApps.get', function() {
						it( 'should get current user\' connected applications',
						function( done2 ) {
							me.connectedApp( appId ).get( function( err2, data2 ) {
								if ( err2 ) throw err2;

								assert.ok( data2 );
								assert.equal( appId, data2.ID );
								done2();
							} );
						} );
					} );
				}
				done();
			} );
		} );
	} );
} );
