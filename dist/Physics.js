'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _PointSystem2 = require('./PointSystem');

var _PointSystem3 = _interopRequireDefault(_PointSystem2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This file is part of the physics library.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) Magnus Bergman <hello@magnus.sexy>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * file that was distributed with this source code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * This is the Physics class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */

var Physics = (function (_PointSystem) {
  _inherits(Physics, _PointSystem);

  /**
   * Create Physics.
   *
   * @param {number} gravityX
   * @param {number} gravityY
   * @param {number} drag
   */

  function Physics(gravityX, gravityY, drag) {
    _classCallCheck(this, Physics);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Physics).call(this, gravityX, gravityY, drag));

    _this.running = false;

    _this.queue = [];

    _this.equilibriumCallbacks = [];

    _this.run();
    return _this;
  }

  /**
   * Set Physics in running mode which enables update on requestAnimationFrame.
   *
   * @return {Physics}
   */

  _createClass(Physics, [{
    key: 'start',
    value: function start() {
      if (this.running) {
        return this;
      }

      this.running = true;
      this.equilibrium = false;

      return this;
    }

    /**
     * Stop Physics from updating on requestAnimationFrame.
     *
     * @return {Physics}
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;

      return this;
    }

    /**
     * Toggle start/stop.
     *
     * @return {Physics}
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.running) {
        this.stop();
      } else {
        this.start();
      }

      return this;
    }

    /**
     * Add function to call on update.
     *
     * @param {function} cb
     *
     * @return {Physics}
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(cb) {
      if (this.queue.indexOf(cb) >= 0 || typeof cb !== 'function') {
        return this;
      }

      this.queue.push(cb);

      return this;
    }

    /**
     * Add function to call when Physics is in equilibrium.
     *
     * @param {function} cb
     *
     * @return {Physics}
     */

  }, {
    key: 'onEquilibrium',
    value: function onEquilibrium(cb) {
      if (this.equilibriumCallbacks.indexOf(cb) >= 0 || typeof cb !== 'function') {
        return this;
      }

      this.equilibriumCallbacks.push(cb);

      return this;
    }

    /**
     * Call all the functions attached to onUpdate.
     *
     * @return {Physics}
     */

  }, {
    key: 'update',
    value: function update() {
      if (this.optimized && this.equilibrium) {
        return this;
      }

      this.tick();

      for (var i = 0; i < this.queue.length; i++) {
        this.queue[i]();
      }

      return this;
    }

    /**
     * Run on requestAnimationFrame.
     *
     * @return {void}
     */

  }, {
    key: 'run',
    value: function run() {
      if (this.running) {
        this.update();
      }

      (0, _raf2.default)(this.run.bind(this));
    }
  }]);

  return Physics;
})(_PointSystem3.default);

exports.default = Physics;