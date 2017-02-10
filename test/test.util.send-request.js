/**
 * Module dependencies
 */
import { expect, assert } from 'chai';

/**
 * Internal dependencies
 */
import wpcomFactory, {
	defaultApiVersion
} from '../';

import sendRequest, {
	apiVersionPattern,
	apiNamespacePattern,
}
from '../lib/util/send-request';

const wpcom = wpcomFactory();

/**
 * Testing data
 */
import fixture from './fixture';

describe( 'wpcom', () => {
	describe( 'wpcom.util.sendRequest', () => {
		describe( 'apiVersion shape', () => {
			it( 'should not accept `v1` as a valid version value', () => {
				expect( apiVersionPattern.test( 'v1' ) ).to.be.false;
			} );

			it( 'should accept `1` as a valid version value', () => {
				expect( apiVersionPattern.test( '1' ) ).to.be.true;
			} );

			it( 'should not accept `1.` as a valid version value', () => {
				expect( apiVersionPattern.test( '1.' ) ).to.be.false;
			} );

			it( 'should accept `1.3` as a valid version value', () => {
				expect( apiVersionPattern.test( '1.3' ) ).to.be.true;
			} );
		} );

		describe( 'apiNamespace shape', () => {
			it( 'should not accept `wpcom` as a valid version value', () => {
				expect( apiNamespacePattern.test( 'wpcom' ) ).to.be.false;
			} );

			it( 'should accept `wpcom/v1` as a valid version value', () => {
				expect( apiNamespacePattern.test( 'wpcom/v1' ) ).to.be.true;
			} );

			it( 'should not accept `wpcom/` as a valid version value', () => {
				expect( apiNamespacePattern.test( 'wpcom/' ) ).to.be.false;
			} );

			it( 'should not accept `wpcom/1` as a valid version value', () => {
				expect( apiNamespacePattern.test( 'wpcom/1' ) ).to.be.false;
			} );
		} );

		describe( 'parameters parameters', () => {
			it( 'should throw Error when `apiVersion` is malformed', () => {
				const path = '/endpoint/path';
				const promise = sendRequest.bind( wpcom, path, { apiVersion: 'version1' }, {} );
				assert.throws( promise, Error, '{ apiVersion: \'version1\' } value is invalid.' );
			} );

			it( 'should throw Error when `apiNamespace` is malformed', () => {
				const path = '/endpoint/path';
				const promise = sendRequest.bind( wpcom, path, { apiNamespace: 'wpcom' }, {} );
				assert.throws( promise, Error, '{ apiNamespace: \'wpcom\' } value is invalid.' );
			} );

			it( 'should throw Error when `apiVersion` and `apiNamespace` are both defined', () => {
				const path = '/timezones';

				const promise = sendRequest.bind( wpcom, path, { apiVersion: 'v1.4', apiNamespace: 'wpcom/v2' }, {} );
				assert.throws( promise, Error, 'apiVersion and apiNamespace cannot be simultaneously defined.' );
			} );
		} );
	} );
} );
