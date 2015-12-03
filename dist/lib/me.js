var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

/**
 * Module dependencies
 */

var _meSettings = require('./me.settings');

var _meSettings2 = _interopRequireDefault(_meSettings);

var _meConnectedApplication = require('./me.connected-application');

var _meConnectedApplication2 = _interopRequireDefault(_meConnectedApplication);

var _mePublicizeConnection = require('./me.publicize-connection');

var _mePublicizeConnection2 = _interopRequireDefault(_mePublicizeConnection);

/**
 * Create `Me` instance
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
function Me(wpcom) {
  if (!(this instanceof Me)) {
    return new Me(wpcom);
  }

  this.wpcom = wpcom;
}

/**
 * Meta data about auth token's User
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.get = function (query, fn) {
  return this.wpcom.req.get('/me', query, fn);
};

/**
 * Get user billing history.
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} [fn] - callback function
 * @return {Function} request handler
 */
Me.prototype.billingHistory = function (query, fn) {
  return this.wpcom.req.get('/me/billing-history', query, fn);
};

/**
 * A list of the current user's sites
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.sites = function (query, fn) {
  return this.wpcom.req.get('/me/sites', query, fn);
};

/**
 * List the currently authorized user's likes
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.likes = function (query, fn) {
  return this.wpcom.req.get('/me/likes', query, fn);
};

/**
 * A list of the current user's group
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.groups = function (query, fn) {
  return this.wpcom.req.get('/me/groups', query, fn);
};

/**
 * Get current user's connected applications.
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.connectedApps = function (query, fn) {
  return this.wpcom.req.get('/me/connected-applications', query, fn);
};

/**
 * Get a list of publicize connections
 * that the current user has set up.
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.publicizeConnections = function (query, fn) {
  return this.wpcom.req.get('/me/publicize-connections', query, fn);
};

/**
 * Return a `MeSettings` instance.
 *
 * @return {MeSettings} MeSettings instance
 */
Me.prototype.settings = function () {
  return new _meSettings2['default'](this.wpcom);
};

/**
 * Return a `MeConnectedApp` instance.
 *
 * @param {String} id - app id
 * @return {ConnectedApp} Me ConnectedApp instance
 */
Me.prototype.connectedApp = function (id) {
  return new _meConnectedApplication2['default'](id, this.wpcom);
};

/**
 * Return a `MePublicizeConnection` instance.
 *
 * @param {String} id - connection id
 * @return {MePublicizeConnection} MeSettings instance
 */
Me.prototype.publicizeConnection = function (id) {
  return new _mePublicizeConnection2['default'](id, this.wpcom);
};

/**
 * Expose `Me` module
 */
module.exports = Me;