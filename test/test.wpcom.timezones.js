/**
 * Module dependencies
 */
var util = require( './util' );
var assert = require( 'assert' );

/**
 * wpcom.timezones
 */
describe( 'wpcom.timezones', function() {
	it( 'should get timezones list', function( done ) {
		var wpcom = util.wpcom();

		wpcom.timezones()
			.then( data => {
				assert.ok( data );

				assert.ok( typeof( data.found ) === 'number' );

				assert.ok( data.timezones );
				assert.ok( data.timezones instanceof Array );

				assert.ok( data.timezones_by_continent );
				assert.ok( data.timezones_by_continent instanceof Object );

				assert.ok( data.manual_utc_offsets );
				assert.ok( data.manual_utc_offsets instanceof Array );

				done();
			} )
			.catch( done );
	} );
} );
