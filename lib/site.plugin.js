/**
 * Module dependencies
 */
import SubClass from './class/subclass';

export default class SitePlugin extends SubClass {
	/**
	 * `SitePlugin` constructor.
	 *
	 * @param {String} [slug] - the plugin slug
	 * @param {Number|String} siteId - site identifier
	 * @param {WPCOM} wpcom - wpcom instance
	 */
	constructor( slug, siteId, wpcom ) {
		super( {
			type: 'sites',
			subtype: 'plugins',
			id: slug,
			baseId: siteId,
			wpcom
		} );
	}

	/**
	 * Update plugin version
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} [fn] - callback function
	 * @return {Promise} Promise
	 */
	updateVersion( query, fn ) {
		return this.wpcom.req.put( `${ this.pluginPath }/update`, query, fn );
	};

	/**
	 * Install the plugin
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} [fn] - callback function
	 * @return {Promise} Promise
	 */
	install( query, fn ) {
		return this.wpcom.req.put( `${ this.pluginPath }/install`, query, fn );
	};

	/**
	 * Activate the plugin
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
	 * Deactivate the plugin
	 * This method is a shorthand of update()
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} [fn] - callback function
	 * @return {Promise} Promise
	 */
	deactivate( query, fn ) {
		return this.update( query, { active: false }, fn );
	}

	/**
	 * Enable plugin autoupdate
	 * This method is a shorthand of update()
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} [fn] - callback function
	 * @return {Promise} Promise
	 */
	enableAutoupdate( query, fn ) {
		return this.update( query, { autoupdate: true }, fn );
	}

	/**
	 * Disable plugin autoupdate
	 * This method is a shorthand of update()
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} [fn] - callback function
	 * @return {Promise} Promise
	 */
	disableAutoupdate( query, fn ) {
		return this.update( query, { autoupdate: false }, fn );
	};
}
