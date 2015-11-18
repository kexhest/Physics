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

var _math = require('./utils/math');

var m = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is the Vec2 class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */

var Vec2 = (function () {

  /**
   * Create a Vec2.
   *
   * @param {number} x
   * @param {number} y
   */

  function Vec2() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    _classCallCheck(this, Vec2);

    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    this.x = x;
    this.y = y;
  }

  /**
   * Set position.
   *
   * @param {number} x
   * @param {number} y
   */

  _createClass(Vec2, [{
    key: 'set',
    value: function set() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      this.x = x;
      this.y = y;

      return this;
    }

    /**
     * Copy position from another vector.
     *
     * @param {Vec2} v
     *
     * @return {Vec2}
     */

  }, {
    key: 'copy',
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;

      return this;
    }

    /**
     * Reset position.
     *
     * @return {Vec2}
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.x = 0;
      this.y = 0;

      return this;
    }

    /**
     * Create a cloned instance.
     *
     * @return {Vec2}
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new Vec2(this.x, this.y);
    }

    /**
     * Set position to the added sum of two vectors.
     *
     * @param {Vec2} v1
     * @param {Vec2} v2
     *
     * @return {Vec2}
     */

  }, {
    key: 'add',
    value: function add(v1, v2) {
      this.x = v1.x + v2.x;
      this.y = v1.y + v2.y;

      return this;
    }

    /**
     * Add position of another vector.
     *
     * @param {vec2} v
     *
     * @return {Vec2}
     */

  }, {
    key: 'addSelf',
    value: function addSelf(v) {
      this.x += v.x;
      this.y += v.y;

      return this;
    }

    /**
     * Set position to the subtracted sum of two vectors.
     *
     * @param {Vec2} v1
     * @param {Vec2} v2
     *
     * @return {Vec2}
     */

  }, {
    key: 'sub',
    value: function sub(v1, v2) {
      this.x = v1.x - v2.x;
      this.y = v1.y - v2.y;

      return this;
    }

    /**
     * Subtract position of another vector.
     *
     * @param {vec2} v
     *
     * @return {Vec2}
     */

  }, {
    key: 'subSelf',
    value: function subSelf(v) {
      this.x -= v.x;
      this.y -= v.y;

      return this;
    }

    /**
     * Multiply position of another vector.
     *
     * @param {vec2} v
     *
     * @return {Vec2}
     */

  }, {
    key: 'multiplySelf',
    value: function multiplySelf(v) {
      this.x *= v.x;
      this.y *= v.y;

      return this;
    }

    /**
     * Multiply position of the vector.
     *
     * @param {number} s
     *
     * @return {Vec2}
     */

  }, {
    key: 'multiplyScalar',
    value: function multiplyScalar(s) {
      this.x *= s;
      this.y *= s;

      return this;
    }

    /**
     * Divide position of the vector.
     *
     * @param {number} s
     *
     * @return {Vec2}
     */

  }, {
    key: 'divideScalar',
    value: function divideScalar(s) {
      if (s) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }

      return this;
    }

    /**
     * Negate position of the vector.
     *
     * @return {Vec2}
     */

  }, {
    key: 'negate',
    value: function negate() {
      return this.multiplyScalar(-1);
    }

    /**
     * Get the dot product of the vector multiplied with another vector.
     *
     * @param {vec2} v
     *
     * @return {Vec2}
     */

  }, {
    key: 'dot',
    value: function dot(v) {
      return this.x * v.x + this.y * v.y;
    }

    /**
     * Get the squared length of the vector.
     *
     * @return {number}
     */

  }, {
    key: 'lengthSquared',
    value: function lengthSquared() {
      return this.x * this.x + this.y * this.y;
    }

    /**
     * Get the length of the vector.
     *
     * @return {number}
     */

  }, {
    key: 'length',
    value: function length() {
      return m.sqrt(this.lengthSquared());
    }

    /**
     * Normalize position of the vector.
     *
     * @return {vec2}
     */

  }, {
    key: 'normalize',
    value: function normalize() {
      return this.divideScalar(this.length());
    }

    /**
     * Get the distance to another vector.
     *
     * @param {vec2} v
     *
     * @return {number}
     */

  }, {
    key: 'distanceTo',
    value: function distanceTo(v) {
      return m.sqrt(this.distanceToSquared(v));
    }

    /**
     * Get the squared distance to another vector.
     *
     * @param {vec2} v
     *
     * @return {number}
     */

  }, {
    key: 'distanceToSquared',
    value: function distanceToSquared(v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;

      return dx * dx + dy * dy;
    }

    /**
     * Set the length of the vector.
     *
     * @param {number} l
     *
     * @return {vec2}
     */

  }, {
    key: 'setLength',
    value: function setLength(l) {
      return this.normalize().multiplyScalar(l);
    }

    /**
     * Compare vector positios to see if they're at (almost) the same position.
     *
     * @param {vec2} v
     *
     * @return {bool}
     */

  }, {
    key: 'equals',
    value: function equals(v) {
      return this.distanceTo(v) < 0.0001;
    }

    /**
     * Interpolate the vector.
     *
     * @param {vec2} v
     * @param {number} t
     *
     * @return {vec2}
     */

  }, {
    key: 'lerp',
    value: function lerp(v) {
      var t = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      var x = (v.x - this.x) * t + this.x;
      var y = (v.y - this.y) * t + this.y;

      return this.set(x, y);
    }

    /**
     * Check if vector length is (almost) zero.
     *
     * @return {bool}
     */

  }, {
    key: 'isZero',
    value: function isZero() {
      return this.length() < 0.0001;
    }
  }]);

  return Vec2;
})();

exports.default = Vec2;