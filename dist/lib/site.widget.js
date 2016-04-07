var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
	value: true
});
/**
 * Module variables
 */
var root = '/sites';

var SiteWidget = (function () {
	/**
  * `SiteWidget` constructor.
  *
  * @param {String} [id] - the widget ID
  * @param {Number|String} sid - site identifier
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */

	function SiteWidget(id, sid, wpcom) {
		_classCallCheck(this, SiteWidget);

		if (!(this instanceof SiteWidget)) {
			return new SiteWidget(id, sid, wpcom);
		}

		this._id = id;
		this._sid = sid;
		this.wpcom = wpcom;

		this.path = root + '/' + this._sid + '/widgets';
	}

	/*
  * Expose `SiteWidget` module
  */

	/**
  * Get informtion about the widget
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} [fn] - callback function
  * @return {Promise} Promise
  */

	_createClass(SiteWidget, [{
		key: 'get',
		value: function get(query, fn) {
			return this.wpcom.req.get(this.path + '/' + this._id, query, fn);
		}

		/**
   * Activate a widget on a site.
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */
	}, {
		key: 'add',
		value: function add(query, fn) {
			return this.wpcom.req.put(this.path + '/new', query, null, fn);
		}
	}]);

	return SiteWidget;
})();

exports['default'] = SiteWidget;
module.exports = exports['default'];