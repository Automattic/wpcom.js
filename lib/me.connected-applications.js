class MeConnectedApps {
	/**
	* `MeConnectedApps` constructor.
	*
	* @param {WPCOM} wpcom - wpcom instance
	* @return {Null} null
	*/
	constructor( wpcom ) {
		if ( ! ( this instanceof MeConnectedApps ) ) {
			return new MeConnectedApps( wpcom );
		}
		this.wpcom = wpcom;
	}

	/**
	* Get current user's connected applications.
	*
	* @param {Object} [query] - query object parameter
	* @param {Function} fn - callback function
	* @return {Function} request handler
	*/
	list( query, fn ) {
		return this.wpcom.req.get( '/me/connected-applications', query, fn );
	}

	/**
	* Get one of current user's connected applications.
	*
	* @param {String} appId - application identifier
	* @param {Object} [query] - query object parameter
	* @param {Function} fn - callback function
	* @return {Function} request handler
	*/
	get( appId, query, fn ) {
		return this.wpcom.req.get( '/me/connected-applications/' + appId, query, fn );
	}

	/**
	* Get one of current user's connected applications.
	*
	* @param {String} appId - application identifier
	* @param {Object} [query] - query object parameter
	* @param {Function} fn - callback function
	* @return {Function} request handler
	*/
	delete( appId, query, fn ) {
		let path = '/me/connected-applications/' + appId + '/delete';
		return this.wpcom.req.del( path, query, fn );
	}
}

/**
* Expose `MeConnectedApps` module
*/
module.exports = MeConnectedApps;
