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
 * This is the Integrator class.
 *
 * Runge Kutta Integrator
 * https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */

var Integrator = (function () {

  /**
   * Create an Integrator.
   *
   * @param {PointSystem} PointSystem
   */

  function Integrator(PointSystem) {
    _classCallCheck(this, Integrator);

    this.system = PointSystem;

    this.originalPositions = [];
    this.originalVelocities = [];

    this.k1Forces = [];
    this.k1Velocities = [];

    this.k2Forces = [];
    this.k2Velocities = [];

    this.k3Forces = [];
    this.k3Velocities = [];

    this.k4Forces = [];
    this.k4Velocities = [];
  }

  /**
   * Allocate space for the points in the system.
   *
   * @return {Integrator}
   */

  _createClass(Integrator, [{
    key: 'allocatePoints',
    value: function allocatePoints() {
      while (this.system.points.length > this.originalPositions.length) {
        this.originalPositions.push(new _Vec2.default());
        this.originalVelocities.push(new _Vec2.default());

        this.k1Forces.push(new _Vec2.default());
        this.k1Velocities.push(new _Vec2.default());

        this.k2Forces.push(new _Vec2.default());
        this.k2Velocities.push(new _Vec2.default());

        this.k3Forces.push(new _Vec2.default());
        this.k3Velocities.push(new _Vec2.default());

        this.k4Forces.push(new _Vec2.default());
        this.k4Velocities.push(new _Vec2.default());
      }

      return this;
    }

    /**
     * Traverse the Integrator and clear/apply forces.
     *
     * @param {number} time
     *
     * @return {Integrator}
     */

  }, {
    key: 'step',
    value: function step(time) {
      var s = this.system;

      this.allocatePoints();

      for (var i = 0; i < s.points.length; i++) {
        var p = s.points[i];

        if (!p.fixed) {
          this.originalPositions[i].copy(p.position);
          this.originalVelocities[i].copy(p.velocity);
        }

        p.force.clear();
      }

      s.applyForces();

      // K1
      for (var i = 0; i < s.points.length; i++) {
        var p = s.points[i];

        if (!p.fixed) {
          this.k1Forces[i].copy(p.force);
          this.k1Velocities[i].copy(p.velocity);
        }

        p.force.clear();
      }

      // K2
      for (var i = 0; i < s.points.length; i++) {
        var p = s.points[i];

        if (!p.fixed) {
          var op = this.originalPositions[i];
          var k1v = this.k1Velocities[i];

          var x = op.x + k1v.x * 0.5 * time;
          var y = op.y + k1v.y * 0.5 * time;

          p.position.set(x, y);

          var ov = this.originalVelocities[i];
          var k1f = this.k1Forces[i];

          x = ov.x + k1f.x * 0.5 * time / p.mass;
          y = ov.y + k1f.y * 0.5 * time / p.mass;

          p.velocity.set(x, y);
        }
      }

      s.applyForces();

      for (var i = 0; i < s.points.length; i++) {
        var p = s.points[i];

        if (!p.fixed) {
          this.k2Forces[i].copy(p.force);
          this.k2Velocities[i].copy(p.velocity);
        }

        p.force.clear();
      }

      // K3
      for (var i = 0; i < s.points.length; i++) {
        var p = s.points[i];

        if (!p.fixed) {
          var op = this.originalPositions[i];
          var k2v = this.k2Velocities[i];

          p.position.set(op.x + k2v.x * 0.5 * time, op.y + k2v.y * 0.5 * time);

          var ov = this.originalVelocities[i];
          var k2f = this.k2Forces[i];

          p.velocity.set(ov.x + k2f.x * 0.5 * time / p.mass, ov.y + k2f.y * 0.5 * time / p.mass);
        }
      }

      s.applyForces();

      for (var i = 0; i < s.points.length; i++) {
        var p = s.points[i];

        if (!p.fixed) {
          this.k3Forces[i].copy(p.force);
          this.k3Velocities[i].copy(p.velocity);
        }

        p.force.clear();
      }

      // K4
      for (var i = 0; i < s.points.length; i++) {
        var p = s.points[i];

        if (!p.fixed) {
          var op = this.originalPositions[i];
          var k3v = this.k3Velocities[i];

          p.position.set(op.x + k3v.x * time, op.y + k3v.y * time);

          var ov = this.originalVelocities[i];
          var k3f = this.k3Forces[i];

          p.velocity.set(ov.x + k3f.x * time / p.mass, ov.y + k3f.y * time / p.mass);
        }
      }

      s.applyForces();

      for (var i = 0; i < s.points.length; i++) {
        var p = s.points[i];

        if (!p.fixed) {
          this.k4Forces[i].copy(p.force);
          this.k4Velocities[i].copy(p.velocity);
        }
      }

      // TOTAL
      for (var i = 0; i < s.points.length; i++) {
        var p = s.points[i];

        p.age += time;

        if (!p.fixed) {
          var op = this.originalPositions[i];
          var k1v = this.k1Velocities[i];
          var k2v = this.k2Velocities[i];
          var k3v = this.k3Velocities[i];
          var k4v = this.k4Velocities[i];

          var x = op.x + time / 6.0 * (k1v.x + 2.0 * k2v.x + 2.0 * k3v.x + k4v.x);
          var y = op.y + time / 6.0 * (k1v.y + 2.0 * k2v.y + 2.0 * k3v.y + k4v.y);

          p.position.set(x, y);

          var ov = this.originalVelocities[i];
          var k1f = this.k1Forces[i];
          var k2f = this.k2Forces[i];
          var k3f = this.k3Forces[i];
          var k4f = this.k4Forces[i];

          x = ov.x + time / (6.0 * p.mass) * (k1f.x + 2.0 * k2f.x + 2.0 * k3f.x + k4f.x);
          y = ov.y + time / (6.0 * p.mass) * (k1f.y + 2.0 * k2f.y + 2.0 * k3f.y + k4f.y);

          p.velocity.set(x, y);
        }
      }

      return this;
    }
  }]);

  return Integrator;
})();

exports.default = Integrator;