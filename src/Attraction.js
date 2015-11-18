/**
 * This file is part of the physics library.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Vec2 from './Vec2'
import * as m from './utils/math'

/**
 * This is the Attraction class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class Attraction {

  /**
   * Create an Attraction.
   *
   * @param {Point} a
   * @param {Point} b
   * @param {number} k
   * @param {number} d
   */
  constructor (a, b, k, d) {
    this.a = a
    this.b = b
    this.constant = k
    this.on = true
    this.distanceMin = d
    this.distanceMinSquared = d * d
  }

  /**
   * Caclulate the forces on the points affected by the Attraction.
   *
   * @return {Attraction}
   */
  update () {
    const a = this.a
    const b = this.b

    if (!this.on || (a.fixed && b.fixed)) {
      return
    }

    const a2b = new Vec2().sub(a.position, b.position)

    const a2bdistanceSquared = m.max(a2b.lengthSquared(), this.distanceMinSquared)

    const force = (this.constant * a.mass * b.mass) / a2bdistanceSquared

    const length = m.sqrt(a2bdistanceSquared)

    if (force === 0 || length === 0) {
      a2b.clear()
    } else {
      a2b.divideScalar(length).multiplyScalar(force)
    }

    if (!a.fixed) {
      a.force.subSelf(a2b)
    }
    if (!b.fixed) {
      b.force.addSelf(a2b)
    }

    return this
  }

  /**
   * Check whether the points affected by the attraction are resting.
   *
   * @return {bool}
   */
  resting () {
    const a = this.a
    const b = this.b
    const l = this.distanceMin

    return !this.on || (a.fixed && b.fixed) ||
      (a.fixed && b.position.distanceTo(a.position) <= l && b.resting()) ||
      (b.fixed && a.position.distanceTo(b.position) <= l && a.resting())
  }

}
