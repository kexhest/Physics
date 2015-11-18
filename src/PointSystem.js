/**
 * This file is part of the physics library.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Vec2 from './Vec2'
import Point from './Point'
import Spring from './Spring'
import Attraction from './Attraction'
import Integrator from './Integrator'

const DEFAULT_GRAVITY = 0
const DEFAULT_DRAG = 0.001

/**
 * This is the PointSystem class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class PointSystem {

  /**
   * Create a PointSystem.
   *
   * @param {number} gravityX
   * @param {number} gravityY
   * @param {number} drag
   *
   * @return void
   */
  constructor (gravityX = DEFAULT_GRAVITY, gravityY = DEFAULT_GRAVITY, drag = DEFAULT_DRAG) {
    this.equilibriumCriteria = {
      points: true,
      springs: true,
      attractions: true
    }

    this.equilibrium = false // are we at equilibrium?
    this.optimized = false

    this.points = []
    this.springs = []
    this.attractions = []
    this.forces = []
    this.integrator = new Integrator(this)
    this.hasDeadPoints = false

    this.DEFAULT_GRAVITY = DEFAULT_GRAVITY
    this.DEFAULT_DRAG = DEFAULT_DRAG

    this.gravity = new Vec2(gravityX, gravityY)
    this.drag = drag
  }

  /**
   * Set whether to optimize the simulation. This enables the check of whether
   * points are moving.
   *
   * @param {bool} b
   *
   * @return {object} Instance of PointSystem.
   */
  optimize (b) {
    this.optimized = !!b

    return this
  }

  /**
   * Set global gravity for the system.
   *
   * @param {number} x
   * @param {number} y
   *
   * @return {object} Instance of PointSystem.
   */
  setGravity (x, y) {
    this.gravity.set(x, y)

    return this
  }

  /**
   * Set criteria for equilibrium.
   *
   * @param {array} points
   * @param {array} springs
   * @param {array} attractions
   *
   * @return {void}
   */
  setEquilibriumCriteria (points, springs, attractions) {
    this.equilibriumCriteria.points = !!points
    this.equilibriumCriteria.springs = !!springs
    this.equilibriumCriteria.attractions = !!attractions
  }

  /**
   * Update the integrator
   *
   * @return {object} Instance of PointSystem.
   */
  tick () {
    this.integrator.step(arguments.length === 0 ? 1 : arguments[0])

    if (this.optimized) {
      this.equilibrium = !this.needsUpdate()
    }

    return this
  }

  /**
   * Checks all points, springs and attractions to see if the points/
   * contained points are inert/resting and returns a boolean.
   *
   * @return {bool}
   */
  needsUpdate () {
    if (this.equilibriumCriteria.points) {
      for (let i = 0; i < this.points.length; i++) {
        if (!this.points[i].resting()) {
          return true
        }
      }
    }

    if (this.equilibriumCriteria.springs) {
      for (let i = 0; i < this.springs.length; i++) {
        if (!this.springs[i].resting()) {
          return true
        }
      }
    }

    if (this.equilibriumCriteria.attractions) {
      for (let i = 0; i < this.attractions.length; i++) {
        if (!this.attractions[i].resting()) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Add a point to the PointSystem.
   *
   * @param {Point} p
   *
   * @return {PointSystem}
   */
  addPoint (p) {
    this.points.push(p)

    return this
  }

  /**
   * Add a spring to the PointSystem.
   *
   * @param {Spring} s
   *
   * @return {PointSystem}
   */
  addSpring (s) {
    this.springs.push(s)

    return this
  }

  /**
   * Add an attraction to the PointSystem.
   *
   * @param {Attraction} a
   *
   * @return {PointSystem}
   */
  addAttraction (a) {
    this.attractions.push(a)

    return this
  }

  /**
   * Creates and then adds Point to PointSystem.
   *
   * @param {number} mass
   * @param {number} x
   * @param {number} y
   *
   * @return {Point}
   */
  createPoint (mass, x, y) {
    const point = new Point(mass, x, y)

    this.addPoint(point)

    return point
  }

  /**
   * Create and then adds Spring to PointSystem.
   *
   * @param {Point} a
   * @param {Point} b
   * @param {number} k
   * @param {number} d
   * @param {number} l
   *
   * @return {Spring}
   */
  createSpring (a, b, k, d, l) {
    const spring = new Spring(a, b, k, d, l)

    this.addSpring(spring)

    return spring
  }

  /**
   * Create and then adds Attraction to PointSystem.
   *
   * @param {Point} a
   * @param {Point} b
   * @param {number} k
   * @param {number} d
   *
   * @return {Attraction}
   */
  createAttraction (a, b, k, d) {
    const attraction = new Attraction(a, b, k, d)

    this.addAttraction(attraction)

    return attraction
  }

  /**
   * Clears the PointSystem of all points, springs and attractions.
   *
   * @return {void}
   */
  clear () {
    this.points.length = 0
    this.springs.length = 0
    this.attractions.length = 0
  }

  /**
   * Calculate and apply forces.
   *
   * @return {PointSystem}
   */
  applyForces () {
    if (!this.gravity.isZero()) {
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].force.addSelf(this.gravity)
      }
    }

    const t = new Vec2()

    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i]

      t.set(p.velocity.x * -1 * this.drag, p.velocity.y * -1 * this.drag)

      p.force.addSelf(t)
    }

    for (let i = 0; i < this.springs.length; i++) {
      this.springs[i].update()
    }

    for (let i = 0; i < this.attractions.length; i++) {
      this.attractions[i].update()
    }

    for (let i = 0; i < this.forces.length; i++) {
      this.forces[i].update()
    }

    return this
  }

  /**
   * Clears all forces from points in the system.
   *
   * @return {PointSystem}
   */
  clearForces () {
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].clear()
    }

    return this
  }

}
