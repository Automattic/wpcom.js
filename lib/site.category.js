/**
 * Module dependencies
 */
import SubClass from './class/subclass';

/**
 * SiteCategory class
 */
export default class SiteCategory extends SubClass {
	/**
	 * Constructor
	 *
	 * @param {String} [slug] - category slug
	 * @param {Number|String} siteId - site id
	 * @param {WPCOM} wpcom - wpcom instance
	 */
	constructor( slug, siteId, wpcom ) {
		super( {
			type: 'sites',
			subtype: 'categories',
			idBySlug: true,
			id: slug,
			baseId: siteId,
			wpcom
		} );
	}
}
