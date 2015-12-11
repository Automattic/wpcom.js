var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * Module dependencies
 */

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('wpcom:builder');

/**
 * Add a method defined through of the given name, and subpath (optional)
 * to the given prototype.
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @param {Proto} _proto_ - Class prototype
 * @param {name} name - method name
 * @param {String} [subpath] - endpoint subpath
 */

exports['default'] = function (wpcom, _proto_, name, subpath) {
  _proto_[name] = function (query, fn) {
    var path = '/sites/' + this._id + '/' + subpath;
    return wpcom.req.get(path, query, fn);
  };

  debug('add %o - subpath: %o', name, subpath);
};

;
module.exports = exports['default'];