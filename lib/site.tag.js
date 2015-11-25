/**
 * Tag methods
 *
 * @param {String} [slug] - tag slug
 * @param {String} sid - site id
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
<<<<<<< HEAD

function Tag(slug, sid, wpcom) {
  if (!sid) {
    throw new Error('`site id` is not correctly defined');
  }
=======
function Tag( slug, sid, wpcom ) {
	if ( ! sid ) {
		throw new Error( '`site id` is not correctly defined' );
	}
>>>>>>> 0b58f66... stying

  if (!(this instanceof Tag)) {
    return new Tag(slug, sid, wpcom);
  }

  this.wpcom = wpcom;
  this._sid = sid;
  this._slug = slug;
}

/**
 * Set tag `slug`
 *
 * @param {String} slug - tag slug
 */
<<<<<<< HEAD

Tag.prototype.slug = function (slug) {
  this._slug = slug;
=======
Tag.prototype.slug = function( slug ) {
	this._slug = slug;
>>>>>>> 0b58f66... stying
};

/**
 * Get tag
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Tag.prototype.get = function (query, fn) {
  var path = '/sites/' + this._sid + '/tags/slug:' + this._slug;
  return this.wpcom.req.get(path, query, fn);
=======
Tag.prototype.get = function( query, fn ) {
	var path = '/sites/' + this._sid + '/tags/slug:' + this._slug;
	return this.wpcom.req.get( path, query, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Add tag
 *
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Tag.prototype.add = function (query, body, fn) {
  var path = '/sites/' + this._sid + '/tags/new';
  return this.wpcom.req.post(path, query, body, fn);
=======
Tag.prototype.add = function( query, body, fn ) {
	var path = '/sites/' + this._sid + '/tags/new';
	return this.wpcom.req.post( path, query, body, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Edit tag
 *
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Tag.prototype.update = function (query, body, fn) {
  var path = '/sites/' + this._sid + '/tags/slug:' + this._slug;
  return this.wpcom.req.put(path, query, body, fn);
=======
Tag.prototype.update = function( query, body, fn ) {
	var path = '/sites/' + this._sid + '/tags/slug:' + this._slug;
	return this.wpcom.req.put( path, query, body, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Delete tag
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Tag.prototype['delete'] = Tag.prototype.del = function (query, fn) {
  var path = '/sites/' + this._sid + '/tags/slug:' + this._slug + '/delete';
  return this.wpcom.req.del(path, query, fn);
=======
Tag.prototype.delete = Tag.prototype.del = function( query, fn ) {
	var path = '/sites/' + this._sid + '/tags/slug:' + this._slug + '/delete';
	return this.wpcom.req.del( path, query, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Expose `Tag` module
 */
<<<<<<< HEAD

module.exports = Tag;
=======
module.exports = Tag;
>>>>>>> 0b58f66... stying
