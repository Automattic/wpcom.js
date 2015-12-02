/**
 * Module dependencies
 */
import MeSettings from './me.settings';

/**
 * Create `Me` instance
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
function Me( wpcom ) {
	if ( ! ( this instanceof Me ) ) {
		return new Me( wpcom );
	}

	this.wpcom = wpcom;
}

/**
 * Meta data about auth token's User
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.get = function( query, fn ) {
	return this.wpcom.req.get( '/me', query, fn );
};

/**
 * Get user billing history.
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} [fn] - callback function
 * @return {Function} request handler
 */
Me.prototype.billingHistory = function( query, fn ) {
	return this.wpcom.req.get( '/me/billing-history', query, fn );
};

/**
 * A list of the current user's sites
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.sites = function( query, fn ) {
	return this.wpcom.req.get( '/me/sites', query, fn );
};

/**
 * List the currently authorized user's likes
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.likes = function( query, fn ) {
	return this.wpcom.req.get( '/me/likes', query, fn );
};

/**
 * A list of the current user's group
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.groups = function( query, fn ) {
	return this.wpcom.req.get( '/me/groups', query, fn );
};

/**
 * Return a `MeSettings` instance.
 *
 * @return {MeSettings} MeSettings instance
 */
Me.prototype.settings = function() {
	return new MeSettings( this.wpcom );
};

/**
 * Expose `Me` module
 */
module.exports = Me;
