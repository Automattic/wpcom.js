/**
 * SiteEmbed methods
 *
 * @param {String} sid - site id
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
class SiteEmbed {
	constructor( url, sid, wpcom ) {
		if ( ! sid ) {
			throw new Error( '`site id` is not correctly defined' );
		}

		if ( ! ( this instanceof SiteEmbed ) ) {
			return new SiteEmbed( url, sid, wpcom );
		}

		this.wpcom = wpcom;
		this._sid = sid;
		this._url = url;
		this.path = `/sites/${this._sid}/embeds`;
	}

	/**
	 * Get the rendered embed
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	render( query, fn ) {
		if ( 'function' === typeof query ) {
			fn = query;
			query = {}
		}

		query = query || {}
		query.embed_url = this._url;
		return this.wpcom.req.get( `${ this.path }/render`, query, fn );
	}
}

export default SiteEmbed;
