/**
 * This file is part of the physics library.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Vec2 from './Vec2'
import Particle from './Particle'
import Spring from './Spring'
import Attraction from './Attraction'
import Integrator from './Integrator'

const DEFAULT_GRAVITY = 0
const DEFAULT_DRAG = 0.001

/**
 * This is the ParticleSystem class.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class ParticleSystem {

  /**
   * Create a ParticleSystem.
   *
   * @param {number} gravityX
   * @param {number} gravityY
   * @param {number} drag
   *
   * @return void
   */
  constructor (gravityX = DEFAULT_GRAVITY, gravityY = DEFAULT_GRAVITY, drag = DEFAULT_DRAG) {
    this.equilibriumCriteria = {
      particles: true,
      springs: true,
      attractions: true
    }

    this.equilibrium = false // are we at equilibrium?
    this.optimized = false

    this.particles = []
    this.springs = []
    this.attractions = []
    this.forces = []
    this.integrator = new Integrator(this)
    this.hasDeadParticles = false

    this.DEFAULT_GRAVITY = DEFAULT_GRAVITY
    this.DEFAULT_DRAG = DEFAULT_DRAG

    this.gravity = new Vec2(gravityX, gravityY)
    this.drag = drag
  }

  /**
   * Set whether to optimize the simulation. This enables the check of whether
   * particles are moving.
   *
   * @param {bool} b
   *
   * @return {object} Instance of ParticleSystem.
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
   * @return {object} Instance of ParticleSystem.
   */
  setGravity (x, y) {
    this.gravity.set(x, y)

    return this
  }

  /**
   * Set criteria for equilibrium.
   *
   * @param {array} particles
   * @param {array} springs
   * @param {array} attractions
   *
   * @return {void}
   */
  setEquilibriumCriteria (particles, springs, attractions) {
    this.equilibriumCriteria.particles = !!particles
    this.equilibriumCriteria.springs = !!springs
    this.equilibriumCriteria.attractions = !!attractions
  }

  /**
   * Update the integrator
   *
   * @return {object} Instance of ParticleSystem.
   */
  tick () {
    this.integrator.step(arguments.length === 0 ? 1 : arguments[0])

    if (this.optimized) {
      this.equilibrium = !this.needsUpdate()
    }

    return this
  }

  /**
   * Checks all particles, springs and attractions to see if the particles/
   * contained particles are inert/resting and returns a boolean.
   *
   * @return {bool}
   */
  needsUpdate () {
    if (this.equilibriumCriteria.particles) {
      for (let i = 0; i < this.particles.length; i++) {
        if (!this.particles[i].resting()) {
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
   * Add a particle to the ParticleSystem.
   *
   * @param {Particle} p
   *
   * @return {ParticleSystem}
   */
  addParticle (p) {
    this.particles.push(p)

    return this
  }

  /**
   * Add a spring to the ParticleSystem.
   *
   * @param {Spring} s
   *
   * @return {ParticleSystem}
   */
  addSpring (s) {
    this.springs.push(s)

    return this
  }

  /**
   * Add an attraction to the ParticleSystem.
   *
   * @param {Attraction} a
   *
   * @return {ParticleSystem}
   */
  addAttraction (a) {
    this.attractions.push(a)

    return this
  }

  /**
   * Creates and then adds Particle to ParticleSystem.
   *
   * @param {number} mass
   * @param {number} x
   * @param {number} y
   *
   * @return {Particle}
   */
  createParticle (mass, x, y) {
    const particle = new Particle(mass, x, y)

    this.addParticle(particle)

    return particle
  }

  /**
   * Create and then adds Spring to ParticleSystem.
   *
   * @param {Particle} a
   * @param {Particle} b
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
   * Create and then adds Attraction to ParticleSystem.
   *
   * @param {Particle} a
   * @param {Particle} b
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
   * Clears the ParticleSystem of all particles, springs and attractions.
   *
   * @return {void}
   */
  clear () {
    this.particles.length = 0
    this.springs.length = 0
    this.attractions.length = 0
  }

  /**
   * Calculate and apply forces.
   *
   * @return {ParticleSystem}
   */
  applyForces () {
    if (!this.gravity.isZero()) {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].force.addSelf(this.gravity)
      }
    }

    const t = new Vec2()

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i]

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
   * Clears all forces from particles in the system.
   *
   * @return {ParticleSystem}
   */
  clearForces () {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].clear()
    }

    return this
  }

}
