/**
 * Module dependencies
 */
import SubClass from './class/subclass';

/**
 * SiteTag class
 */
export default class SiteTag extends SubClass {
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
			subtype: 'tags',
			idBySlug: true,
			id: slug,
			baseId: siteId,
			wpcom
		} );
	}
}
