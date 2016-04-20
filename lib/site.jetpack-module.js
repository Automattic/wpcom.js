
/**
 * SiteJetPackModule methods
 *
 * @param {String} sid - site id
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
class SiteJetPackModule {
	constructor( id, sid, wpcom ) {
		if ( ! sid ) {
			throw new Error( '`site id` is not correctly defined' );
		}

		if ( ! ( this instanceof SiteJetPackModule ) ) {
			return new SiteJetPackModule( id, sid, wpcom );
		}

		this.wpcom = wpcom;
		this._id = id;
		this._sid = sid;
		this.path = `/sites/${this._sid}/jetpack/modules`;
		this.subpath = `${this.path}/${this._id}`;
	}

	/**
	 * Get jetpack-module information
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	get( query, fn ) {
		return this.wpcom.req.get( this.subpath, query, fn );
	}

	/**
	 * Update jetpack-module configuration
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	update( query, body, fn ) {
		return this.wpcom.req.put( this.subpath, query, body, fn );
	}

	/**
	 * Activate the jetpack-module
	 * This method is a shorthand of update()
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} [fn] - callback function
	 * @return {Promise} Promise
	 */
	activate( query, fn ) {
		return this.update( query, { active: true }, fn );
	};

	/**
	 * Deactivate the jetpack-module
	 * This method is a shorthand of update()
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} [fn] - callback function
	 * @return {Promise} Promise
	 */
	deactivate( query, fn ) {
		return this.update( query, { active: false }, fn );
	}

}

export default SiteJetPackModule;
