/**
 * Create a `Users` instance
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
<<<<<<< HEAD

function Users(wpcom) {
  if (!(this instanceof Users)) {
    return new Users(wpcom);
  }
=======
function Users( wpcom ) {
	if ( ! ( this instanceof Users ) ) {
		return new Users( wpcom );
	}
>>>>>>> 0b58f66... stying

  this.wpcom = wpcom;
}

/**
 * A list of @mention suggestions for the current user
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
<<<<<<< HEAD

Users.prototype.suggest = function (query, fn) {
  return this.wpcom.req.get('/users/suggest', query, fn);
=======
Users.prototype.suggest = function( query, fn ) {
	return this.wpcom.req.get( '/users/suggest', query, fn );
>>>>>>> 0b58f66... stying
};

/**
 * Expose `Users` module
 */
<<<<<<< HEAD

module.exports = Users;
=======
module.exports = Users;
>>>>>>> 0b58f66... stying
