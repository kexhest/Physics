/**
 * This file is part of the physics library.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import rAF from 'raf'
import PointSystem from './PointSystem'

/**
 * This is the Physics class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class Physics extends PointSystem {

  /**
   * Create Physics.
   *
   * @param {number} gravityX
   * @param {number} gravityY
   * @param {number} drag
   */
  constructor (gravityX, gravityY, drag) {
    super(gravityX, gravityY, drag)

    this.running = false

    this.queue = []

    this.equilibriumCallbacks = []

    this.run()
  }

  /**
   * Set Physics in running mode which enables update on requestAnimationFrame.
   *
   * @return {Physics}
   */
  start () {
    if (this.running) {
      return this
    }

    this.running = true
    this.equilibrium = false

    return this
  }

  /**
   * Stop Physics from updating on requestAnimationFrame.
   *
   * @return {Physics}
   */
  stop () {
    this.running = false

    return this
  }

  /**
   * Toggle start/stop.
   *
   * @return {Physics}
   */
  toggle () {
    if (this.running) {
      this.stop()
    } else {
      this.start()
    }

    return this
  }

  /**
   * Add function to call on update.
   *
   * @param {function} cb
   *
   * @return {Physics}
   */
  onUpdate (cb) {
    if (this.queue.indexOf(cb) >= 0 || typeof cb !== 'function') {
      return this
    }

    this.queue.push(cb)

    return this
  }

  /**
   * Add function to call when Physics is in equilibrium.
   *
   * @param {function} cb
   *
   * @return {Physics}
   */
  onEquilibrium (cb) {
    if (this.equilibriumCallbacks.indexOf(cb) >= 0 || typeof cb !== 'function') {
      return this
    }

    this.equilibriumCallbacks.push(cb)

    return this
  }

  /**
   * Call all the functions attached to onUpdate.
   *
   * @return {Physics}
   */
  update () {
    if (this.optimized && this.equilibrium) {
      return this
    }

    this.tick()

    for (var i = 0; i < this.queue.length; i++) {
      this.queue[i]()
    }

    return this
  }

  /**
   * Run on requestAnimationFrame.
   *
   * @return {void}
   */
  run () {
    if (this.running) {
      this.update()
    }

    rAF(this.run.bind(this))
  }
}
