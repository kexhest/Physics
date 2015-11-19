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
 * This is the Integrator class.
 *
 * Runge Kutta Integrator
 * https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class Integrator {

  /**
   * Create an Integrator.
   *
   * @param {PointSystem} PointSystem
   */
  constructor (PointSystem) {
    this.system = PointSystem

    this.originalPositions = []
    this.originalVelocities = []

    this.k1Forces = []
    this.k1Velocities = []

    this.k2Forces = []
    this.k2Velocities = []

    this.k3Forces = []
    this.k3Velocities = []

    this.k4Forces = []
    this.k4Velocities = []
  }

  /**
   * Allocate space for the points in the system.
   *
   * @return {Integrator}
   */
  allocatePoints () {
    while (this.system.points.length > this.originalPositions.length) {
      this.originalPositions.push(new Vec2())
      this.originalVelocities.push(new Vec2())

      this.k1Forces.push(new Vec2())
      this.k1Velocities.push(new Vec2())

      this.k2Forces.push(new Vec2())
      this.k2Velocities.push(new Vec2())

      this.k3Forces.push(new Vec2())
      this.k3Velocities.push(new Vec2())

      this.k4Forces.push(new Vec2())
      this.k4Velocities.push(new Vec2())
    }

    return this
  }

  /**
   * Traverse the Integrator and clear/apply forces.
   *
   * @param {number} time
   *
   * @return {Integrator}
   */
  step (time) {
    const s = this.system

    this.allocatePoints()

    // Store original positions and velocities.
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i]

      if (!p.fixed) {
        this.originalPositions[i].copy(p.position)
        this.originalVelocities[i].copy(p.velocity)
      }

      p.force.clear()
    }

    s.applyForces()

    // K1: Store intermediate forces.
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i]

      if (!p.fixed) {
        this.k1Forces[i].copy(p.force)
        this.k1Velocities[i].copy(p.velocity)
      }

      p.force.clear()
    }

    // K2: Calculate intermediate forces.
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i]

      if (!p.fixed) {
        const op = this.originalPositions[i]
        const k1v = this.k1Velocities[i]

        let x = op.x + k1v.x * 0.5 * time
        let y = op.y + k1v.y * 0.5 * time

        p.position.set(x, y)

        const ov = this.originalVelocities[i]
        const k1f = this.k1Forces[i]

        x = ov.x + k1f.x * 0.5 * time / p.mass
        y = ov.y + k1f.y * 0.5 * time / p.mass

        p.velocity.set(x, y)
      }
    }

    s.applyForces()

    // K2: Store intermediate forces.
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i]

      if (!p.fixed) {
        this.k2Forces[i].copy(p.force)
        this.k2Velocities[i].copy(p.velocity)
      }

      p.force.clear()
    }

    // K3: Calculate intermediate forces.
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i]

      if (!p.fixed) {
        const op = this.originalPositions[i]
        const k2v = this.k2Velocities[i]

        p.position.set(op.x + k2v.x * 0.5 * time, op.y + k2v.y * 0.5 * time)

        const ov = this.originalVelocities[i]
        const k2f = this.k2Forces[i]

        p.velocity.set(ov.x + k2f.x * 0.5 * time / p.mass, ov.y + k2f.y * 0.5 * time / p.mass)
      }
    }

    s.applyForces()

    // K3: Store intermediate forces.
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i]

      if (!p.fixed) {
        this.k3Forces[i].copy(p.force)
        this.k3Velocities[i].copy(p.velocity)
      }

      p.force.clear()
    }

    // K4: Calculate intermediate forces.
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i]

      if (!p.fixed) {
        const op = this.originalPositions[i]
        const k3v = this.k3Velocities[i]

        p.position.set(op.x + k3v.x * time, op.y + k3v.y * time)

        const ov = this.originalVelocities[i]
        const k3f = this.k3Forces[i]

        p.velocity.set(ov.x + k3f.x * time / p.mass, ov.y + k3f.y * time / p.mass)
      }
    }

    s.applyForces()

    // K4: Store intermediate forces.
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i]

      if (!p.fixed) {
        this.k4Forces[i].copy(p.force)
        this.k4Velocities[i].copy(p.velocity)
      }
    }

    // Combine and apply all intermediate forces.
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i]

      p.age += time

      if (!p.fixed) {
        const op = this.originalPositions[i]
        const k1v = this.k1Velocities[i]
        const k2v = this.k2Velocities[i]
        const k3v = this.k3Velocities[i]
        const k4v = this.k4Velocities[i]

        // Calculate position.
        let x = op.x + time / 6.0 * (k1v.x + 2.0 * k2v.x + 2.0 * k3v.x + k4v.x)
        let y = op.y + time / 6.0 * (k1v.y + 2.0 * k2v.y + 2.0 * k3v.y + k4v.y)

        // Update position.
        p.position.set(x, y)

        const ov = this.originalVelocities[i]
        const k1f = this.k1Forces[i]
        const k2f = this.k2Forces[i]
        const k3f = this.k3Forces[i]
        const k4f = this.k4Forces[i]

        // Calculate velocity.
        x = ov.x + time / (6.0 * p.mass) * (k1f.x + 2.0 * k2f.x + 2.0 * k3f.x + k4f.x)
        y = ov.y + time / (6.0 * p.mass) * (k1f.y + 2.0 * k2f.y + 2.0 * k3f.y + k4f.y)

        // Update velocity.
        p.velocity.set(x, y)
      }
    }

    return this
  }

}
