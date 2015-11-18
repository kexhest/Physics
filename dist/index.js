'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Integrator = exports.Attraction = exports.Spring = exports.Point = exports.Vec2 = undefined;

var _Vec = require('./Vec2');

Object.defineProperty(exports, 'Vec2', {
  enumerable: true,
  get: function get() {
    return _Vec.Vec2;
  }
});

var _Point = require('./Point');

Object.defineProperty(exports, 'Point', {
  enumerable: true,
  get: function get() {
    return _Point.Point;
  }
});

var _Spring = require('./Spring');

Object.defineProperty(exports, 'Spring', {
  enumerable: true,
  get: function get() {
    return _Spring.Spring;
  }
});

var _Attraction = require('./Attraction');

Object.defineProperty(exports, 'Attraction', {
  enumerable: true,
  get: function get() {
    return _Attraction.Attraction;
  }
});

var _Integrator = require('./Integrator');

Object.defineProperty(exports, 'Integrator', {
  enumerable: true,
  get: function get() {
    return _Integrator.Integrator;
  }
});

var _Physics = require('./Physics');

var _Physics2 = _interopRequireDefault(_Physics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Physics2.default;