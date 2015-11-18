/**
 * This file is part of the physics library.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as m from './utils/math'

/**
 * This is the Vec2 class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class Vec2 {

  /**
   * Create a Vec2.
   *
   * @param {number} x
   * @param {number} y
   */
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  /**
   * Set position.
   *
   * @param {number} x
   * @param {number} y
   */
  set (x = 0, y = 0) {
    this.x = x
    this.y = y

    return this
  }

  /**
   * Copy position from another vector.
   *
   * @param {Vec2} v
   *
   * @return {Vec2}
   */
  copy (v) {
    this.x = v.x
    this.y = v.y

    return this
  }

  /**
   * Reset position.
   *
   * @return {Vec2}
   */
  clear () {
    this.x = 0
    this.y = 0

    return this
  }

  /**
   * Create a cloned instance.
   *
   * @return {Vec2}
   */
  clone () {
    return new Vec2(this.x, this.y)
  }

  /**
   * Set position to the added sum of two vectors.
   *
   * @param {Vec2} v1
   * @param {Vec2} v2
   *
   * @return {Vec2}
   */
  add (v1, v2) {
    this.x = v1.x + v2.x
    this.y = v1.y + v2.y

    return this
  }

  /**
   * Add position of another vector.
   *
   * @param {vec2} v
   *
   * @return {Vec2}
   */
  addSelf (v) {
    this.x += v.x
    this.y += v.y

    return this
  }

  /**
   * Set position to the subtracted sum of two vectors.
   *
   * @param {Vec2} v1
   * @param {Vec2} v2
   *
   * @return {Vec2}
   */
  sub (v1, v2) {
    this.x = v1.x - v2.x
    this.y = v1.y - v2.y

    return this
  }

  /**
   * Subtract position of another vector.
   *
   * @param {vec2} v
   *
   * @return {Vec2}
   */
  subSelf (v) {
    this.x -= v.x
    this.y -= v.y

    return this
  }

  /**
   * Multiply position of another vector.
   *
   * @param {vec2} v
   *
   * @return {Vec2}
   */
  multiplySelf (v) {
    this.x *= v.x
    this.y *= v.y

    return this
  }

  /**
   * Multiply position of the vector.
   *
   * @param {number} s
   *
   * @return {Vec2}
   */
  multiplyScalar (s) {
    this.x *= s
    this.y *= s

    return this
  }

  /**
   * Divide position of the vector.
   *
   * @param {number} s
   *
   * @return {Vec2}
   */
  divideScalar (s) {
    if (s) {
      this.x /= s
      this.y /= s
    } else {
      this.set(0, 0)
    }

    return this
  }

  /**
   * Negate position of the vector.
   *
   * @return {Vec2}
   */
  negate () {
    return this.multiplyScalar(-1)
  }

  /**
   * Get the dot product of the vector multiplied with another vector.
   *
   * @param {vec2} v
   *
   * @return {Vec2}
   */
  dot (v) {
    return this.x * v.x + this.y * v.y
  }

  /**
   * Get the squared length of the vector.
   *
   * @return {number}
   */
  lengthSquared () {
    return this.x * this.x + this.y * this.y
  }

  /**
   * Get the length of the vector.
   *
   * @return {number}
   */
  length () {
    return m.sqrt(this.lengthSquared())
  }

  /**
   * Normalize position of the vector.
   *
   * @return {vec2}
   */
  normalize () {
    return this.divideScalar(this.length())
  }

  /**
   * Get the distance to another vector.
   *
   * @param {vec2} v
   *
   * @return {number}
   */
  distanceTo (v) {
    return m.sqrt(this.distanceToSquared(v))
  }

  /**
   * Get the squared distance to another vector.
   *
   * @param {vec2} v
   *
   * @return {number}
   */
  distanceToSquared (v) {
    const dx = this.x - v.x
    const dy = this.y - v.y

    return dx * dx + dy * dy
  }

  /**
   * Set the length of the vector.
   *
   * @param {number} l
   *
   * @return {vec2}
   */
  setLength (l) {
    return this.normalize().multiplyScalar(l)
  }

  /**
   * Compare vector positios to see if they're at (almost) the same position.
   *
   * @param {vec2} v
   *
   * @return {bool}
   */
  equals (v) {
    return (this.distanceTo(v) < 0.0001)
  }

  /**
   * Interpolate the vector.
   *
   * @param {vec2} v
   * @param {number} t
   *
   * @return {vec2}
   */
  lerp (v, t) {
    const x = (v.x - this.x) * t + this.x
    const y = (v.y - this.y) * t + this.y

    return this.set(x, y)
  }

  /**
   * Check if vector length is (almost) zero.
   *
   * @return {bool}
   */
  isZero () {
    return (this.length() < 0.0001)
  }

}
