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
 * This is the Point class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class Point {

  /**
   * Create a Point.
   *
   * @param {number} mass
   * @param {number} x
   * @param {number} y
   */
  constructor (mass = 1.0, x = 0, y = 0) {
    this.position = new Vec2(x, y)

    this.velocity = new Vec2()
    this.force = new Vec2()

    this.mass = mass

    this.fixed = false

    this.age = 0
    this.dead = false
  }

  /**
   * Get the distance to another point.
   *
   * @param {Point} p
   *
   * @return {number}
   */
  distanceTo (p) {
    return this.position.distanceTo(p.position)
  }

  /**
   * Lock the position of the point.
   *
   * @return {Point}
   */
  fix () {
    this.fixed = true
    this.velocity.clear()

    return this
  }

  /**
   * Reset the point.
   *
   * @return {Point}
   */
  reset () {
    this.clear()
    this.velocity.clear()
    this.force.clear()

    this.mass = 1.0

    this.age = 0
    this.dead = false

    return this
  }

  /**
   * Check whether the point is resting.
   *
   * @return {bool}
   */
  resting () {
    return this.fixed || this.velocity.isZero() && this.force.isZero()
  }

}
