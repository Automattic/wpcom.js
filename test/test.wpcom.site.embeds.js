/**
 * Module dependencies
 */
var util = require( './util' );
var assert = require( 'assert' );

/**
 * Testing data
 */
var fixture = require( './fixture' );

describe( 'wpcom.site.embed', function() {
	// Global instances
	var wpcom = util.wpcom();
	var site = wpcom.site( util.site() );

	describe( 'wpcom.site.renderEmbed', function() {
		it( 'should render embed', done => {
			site.renderEmbed( fixture.embed )
				.then( data => {
					assert.equal( data.embed_url, fixture.embed );
					assert.ok( data.result );
					done();
				} )
				.catch( done );
		} );
	} );

	describe( 'wpcom.site.embed.render', function() {
		it( 'should render embed', done => {
			var embed = site.embed( fixture.embed );

			embed.render()
				.then( data => {
					assert.equal( data.embed_url, fixture.embed );
					assert.ok( data.result );
					done();
				} )
				.catch( done );
		} );
	} );
} );
