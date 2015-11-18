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

var _math = require('./utils/math');

var m = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is the Attraction class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */

var Attraction = (function () {

  /**
   * Create an Attraction.
   *
   * @param {Point} a
   * @param {Point} b
   * @param {number} k
   * @param {number} d
   */

  function Attraction(a, b, k, d) {
    _classCallCheck(this, Attraction);

    this.a = a;
    this.b = b;
    this.constant = k;
    this.on = true;
    this.distanceMin = d;
    this.distanceMinSquared = d * d;
  }

  /**
   * Caclulate the forces on the points affected by the Attraction.
   *
   * @return {Attraction}
   */

  _createClass(Attraction, [{
    key: 'update',
    value: function update() {
      var a = this.a;
      var b = this.b;

      if (!this.on || a.fixed && b.fixed) {
        return;
      }

      var a2b = new _Vec2.default().sub(a.position, b.position);

      var a2bdistanceSquared = m.max(a2b.lengthSquared(), this.distanceMinSquared);

      var force = this.constant * a.mass * b.mass / a2bdistanceSquared;

      var length = m.sqrt(a2bdistanceSquared);

      if (force === 0 || length === 0) {
        a2b.clear();
      } else {
        a2b.divideScalar(length).multiplyScalar(force);
      }

      if (!a.fixed) {
        a.force.subSelf(a2b);
      }
      if (!b.fixed) {
        b.force.addSelf(a2b);
      }

      return this;
    }

    /**
     * Check whether the points affected by the attraction are resting.
     *
     * @return {bool}
     */

  }, {
    key: 'resting',
    value: function resting() {
      var a = this.a;
      var b = this.b;
      var l = this.distanceMin;

      return !this.on || a.fixed && b.fixed || a.fixed && b.position.distanceTo(a.position) <= l && b.resting() || b.fixed && a.position.distanceTo(b.position) <= l && a.resting();
    }
  }]);

  return Attraction;
})();

exports.default = Attraction;