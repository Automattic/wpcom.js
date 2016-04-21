export default class SubClass {

	constructor( options ) {
		if ( ! options.baseId ) {
			throw new Error( '`site id` is not correctly defined' );
		}

		if ( ! ( this instanceof SubClass ) ) {
			return new SubClass( options );
		}

		// config object container
		this.__conf = Object.assign( {}, options );
		delete this.__conf.wpcom;

		this.id = options.id;
		this.wpcom = options.wpcom;
	}

	get _id() {
		console.warn( 'DO NOT USE post._id anynmore. Use post.id.' );
		return this.id;
	}

	get id() {
		return encodeURIComponent( this.__conf.id );
	}

	get baseId() {
		return encodeURIComponent( this.__conf.baseId );
	}

	set id( value ) {
		this.__conf.id = value;
	}

	get slug() {
		return encodeURIComponent( this.__conf.slug );
	}

	set slug( value ) {
		this.__conf.slug = value;
	}

	get path() {
		return `/${ this.__conf.type }/${ this.__conf.baseId }/${ this.__conf.subtype }`;
	}

	get subpath() {
		return `${ this.path }/${ this.__conf.idBySlug ? 'slug:' : '' }${ this.id }`;
	}

	/**
	 * get()
	 * generic `/<id>` GET request
	 * GET request
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function - callback
	 * @return {Promise} Promise
	 */
	get( query, fn ) {
		return this.wpcom.req.get( this.subpath, query, fn );
	}

	/**
	 * add()
	 * generic `/<id>/new` POST request
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Promise} Promise
	 */
	add( query, body, fn ) {
		return this.wpcom.req.post( `${ this.path }/new`, query, body, fn );
	}

	/**
	 * update()
	 * generic '/<id>' PUT (POST) request
	 *
	 * Edit category
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Promise} Promise
	 */
	update( query, body, fn ) {
		return this.wpcom.req.put( this.subpath, query, body, fn );
	}

	/**
	 * delete()
	 * generic '/<id>/delete' PUT (POST) request
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Promise} Promise
	 */
	delete( query, fn ) {
		return this.wpcom.req.del( `${ this.subpath }/delete`, query, fn );
	}

	/*
	 * del() - delete() alias
	 */
	del( query, fn ) {
		return this.delete( query, fn );
	}
}
