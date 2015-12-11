var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * Module dependencies
 */

var _runtimeMethod = require('./runtime-method');

var _runtimeMethod2 = _interopRequireDefault(_runtimeMethod);

/**
 * Add a method defined through of the given name, and subpath (optional)
 * to the given prototype.
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @param {*} Class - class to extend
 * @param {Array} list - methods list
 * @param {String} [subpath] - endpoint subpath
 */

exports['default'] = function (wpcom, Class, list) {
  list.forEach(function (item) {
    item = 'object' === typeof item ? item : { name: item };
    (0, _runtimeMethod2['default'])(wpcom, Class.prototype, item.name, item.subpath);
  });
};

;
module.exports = exports['default'];