/**
 * This file is part of the physics library.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Vec2 from './Vec2'

/**
 * This is the Spring class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class Spring {

  /**
   * Create a Spring.
   *
   * @param {Particle} a
   * @param {Particle} b
   * @param {number} k
   * @param {number} d
   * @param {number} l
   */
  constructor (a, b, k, d, l) {
    this.a = a
    this.b = b

    this.constant = k
    this.damping = d
    this.length = l

    this.on = true
  }

  /**
   * Calculate the distance between the particles.
   *
   * @return {number}
   */
  currentLength () {
    return this.a.position.distanceTo(this.b.position)
  }

  /**
   * Calculate and add forces to the particles.
   *
   * @return {void}
   */
  update () {
    const a = this.a
    const b = this.b

    if (!(this.on && (!a.fixed || !b.fixed))) return this

    const a2b = new Vec2().sub(a.position, b.position)
    const d = a2b.length()

    if (d === 0) {
      a2b.clear()
    } else {
      a2b.divideScalar(d)
    }

    const fspring = -1 * (d - this.length) * this.constant

    const va2b = new Vec2().sub(a.velocity, b.velocity)

    const fdamping = -1 * this.damping * va2b.dot(a2b)

    const fr = fspring + fdamping

    a2b.multiplyScalar(fr)

    if (!a.fixed) {
      a.force.addSelf(a2b)
    }
    if (!b.fixed) {
      b.force.subSelf(a2b)
    }

    return this
  }

  /**
   * Check whether the particles affected by the spring are resting.
   *
   * @return {bool}
   */
  resting () {
    const a = this.a
    const b = this.b
    const l = this.length

    return !this.on || (a.fixed && b.fixed) ||
      (a.fixed && (l === 0 ? b.position.equals(a.position) : b.position.distanceTo(a.position) <= l) && b.resting()) ||
      (b.fixed && (l === 0 ? a.position.equals(b.position) : a.position.distanceTo(b.position) <= l) && a.resting())
  }

}
