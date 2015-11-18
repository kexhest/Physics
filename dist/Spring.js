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
 * This is the Spring class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */

var Spring = (function () {

  /**
   * Create a Spring.
   *
   * @param {Point} a
   * @param {Point} b
   * @param {number} k
   * @param {number} d
   * @param {number} l
   */

  function Spring(a, b, k, d, l) {
    _classCallCheck(this, Spring);

    this.a = a;
    this.b = b;

    this.constant = k;
    this.damping = d;
    this.length = l;

    this.on = true;
  }

  /**
   * Calculate the distance between the points.
   *
   * @return {number}
   */

  _createClass(Spring, [{
    key: 'currentLength',
    value: function currentLength() {
      return this.a.position.distanceTo(this.b.position);
    }

    /**
     * Calculate and add forces to the points.
     *
     * @return {void}
     */

  }, {
    key: 'update',
    value: function update() {
      var a = this.a;
      var b = this.b;

      if (!(this.on && (!a.fixed || !b.fixed))) return this;

      var a2b = new _Vec2.default().sub(a.position, b.position);
      var d = a2b.length();

      if (d === 0) {
        a2b.clear();
      } else {
        a2b.divideScalar(d);
      }

      var fspring = -1 * (d - this.length) * this.constant;

      var va2b = new _Vec2.default().sub(a.velocity, b.velocity);

      var fdamping = -1 * this.damping * va2b.dot(a2b);

      var fr = fspring + fdamping;

      a2b.multiplyScalar(fr);

      if (!a.fixed) {
        a.force.addSelf(a2b);
      }
      if (!b.fixed) {
        b.force.subSelf(a2b);
      }

      return this;
    }

    /**
     * Check whether the points affected by the spring are resting.
     *
     * @return {bool}
     */

  }, {
    key: 'resting',
    value: function resting() {
      var a = this.a;
      var b = this.b;
      var l = this.length;

      return !this.on || a.fixed && b.fixed || a.fixed && (l === 0 ? b.position.equals(a.position) : b.position.distanceTo(a.position) <= l) && b.resting() || b.fixed && (l === 0 ? a.position.equals(b.position) : a.position.distanceTo(b.position) <= l) && a.resting();
    }
  }]);

  return Spring;
})();

exports.default = Spring;