/**
 * WPCOM module
 */

var util = require('./util');
var assert = require('assert');

/**
 * Testing data
 */
function trueAssertion( done ) { return function() { done(); }; }
function trueCallback( params, callback ) { callback( null, true ); }
function falseAssertion( done ) { return function() { done( new Error('Failed!')); }; }
function falseCallback( params, callback ) { callback( true, null ); }

function timedCallback( delay ) {
	return function( params, callback ) {
		setTimeout( function() { return trueCallback( params, callback ); }, delay );
	};
}

/**
 * WPCOM Promises
 */

describe('wpcom', function(){

	describe('wpcom.wpPromise', function(){
		it('should resolve when true', function(done){
			var wpcom = util.wpcom_public();
			
			wpcom.wpPromise( trueCallback, {} )
				.then( trueAssertion( done ) )
				.catch( falseAssertion( done ) );
		});

		it('should reject when false', function(done){
			var wpcom = util.wpcom_public();

			wpcom.wpPromise( falseCallback, {} )
				.then( falseAssertion( done ) )
				.catch( trueAssertion( done ) );
		});

		it('should fail when slower than timeout', function(done){
			var wpcom = util.wpcom_public();

			wpcom.wpPromise( timedCallback( 10000 ), {}, 10 )
				.then( falseAssertion( done ) )
				.catch( trueAssertion( done ) );
		});
	});

});
