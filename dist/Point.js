'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * This file is part of the physics library.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * (c) Magnus Bergman <hello@magnus.sexy>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * file that was distributed with this source code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec = require('./Vec2');

var _Vec2 = _interopRequireDefault(_Vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is the Point class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */

var Point = (function () {

  /**
   * Create a Point.
   *
   * @param {number} mass
   * @param {number} x
   * @param {number} y
   */

  function Point() {
    var mass = arguments.length <= 0 || arguments[0] === undefined ? 1.0 : arguments[0];
    var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, Point);

    var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    this.position = new _Vec2.default(x, y);

    this.velocity = new _Vec2.default();
    this.force = new _Vec2.default();

    this.mass = mass;

    this.fixed = false;

    this.age = 0;
    this.dead = false;
  }

  /**
   * Get the distance to another point.
   *
   * @param {Point} p
   *
   * @return {number}
   */

  _createClass(Point, [{
    key: 'distanceTo',
    value: function distanceTo(p) {
      return this.position.distanceTo(p.position);
    }

    /**
     * Lock the position of the point.
     *
     * @return {Point}
     */

  }, {
    key: 'fix',
    value: function fix() {
      this.fixed = true;
      this.velocity.clear();

      return this;
    }

    /**
     * Reset the point.
     *
     * @return {Point}
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.clear();
      this.velocity.clear();
      this.force.clear();

      this.mass = 1.0;

      this.age = 0;
      this.dead = false;

      return this;
    }

    /**
     * Check whether the point is resting.
     *
     * @return {bool}
     */

  }, {
    key: 'resting',
    value: function resting() {
      return this.fixed || this.velocity.isZero() && this.force.isZero();
    }
  }]);

  return Point;
})();

exports.default = Point;