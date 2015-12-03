const root = '/me/publicize-connections/';

class PublicizeConnection {
	/**
	* `PublicizeConnection` constructor.
	*
	* @param {String} connectionId - application identifier
	* @param {WPCOM} wpcom - wpcom instance
	* @return {Null} null
	*/
	constructor( connectionId, wpcom ) {
		if ( ! ( this instanceof PublicizeConnection ) ) {
			return new PublicizeConnection( wpcom );
		}
		this._id = connectionId;
		this.wpcom = wpcom;
	}

	/**
	 * Get a single publicize connection that the current user has set up.
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	get( query, fn ) {
		return this.wpcom.req.get( root + this._id, query, fn );
	}

	/**
	 * Get a single publicize connection that the current user has set up.
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	update( query, fn ) {
		return this.wpcom.req.get( root + this._id, query, fn );
	}

	/**
	* Delete the app of the  current user
	* through of the given connectionId
	*
	* @param {Object} [query] - query object parameter
	* @param {Function} fn - callback function
	* @return {Function} request handler
	*/
	delete( query, fn ) {
		return this.wpcom.req.del( root + this._id + '/delete', query, fn );
	}
}

/**
* Expose `PublicizeConnection` module
*/
module.exports = PublicizeConnection;
