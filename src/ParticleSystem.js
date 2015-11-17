import Vector from './Vector'
import Particle from './Particle'
import Spring from './Spring'
import Attraction from './Attraction'
import Integrator from './Integrator'
import * as utils from './utils'

/**
 * traer.js
 * A particle-based physics engine ported from Jeff Traer's Processing
 * library to JavaScript. This version is intended for use with the
 * HTML5 canvas element. It is dependent on Three.js' Vector2 class,
 * but can be overridden with any Vector2 class with the methods included.
 *
 * @author Jeffrey Traer Bernstein <jeff TA traer TOD cc> (original Java library)
 * @author Adam Saponara <saponara TA gmail TOD com> (JavaScript port)
 * @author Jono Brandel <http://jonobr1.com/> (requirified/optimization port)
 *
 * @version 0.3
 * @date March 25, 2012
 */

const DEFAULT_GRAVITY = 0
const DEFAULT_DRAG = 0.001

/**
 * The whole kit and kaboodle.
 *
 * @class
 */
export default class ParticleSystem {

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

    this.Attraction = Attraction
    this.Integrator = Integrator
    this.Particle = Particle
    this.Spring = Spring
    this.Vector = Vector

    this.DEFAULT_GRAVITY = DEFAULT_GRAVITY
    this.DEFAULT_DRAG = DEFAULT_DRAG

    this.gravity = new Vector(gravityX, gravityY)
    this.drag = drag
  }

  /**
   * Set whether to optimize the simulation. This enables the check of whether
   * particles are moving.
   */
  optimize (b) {
    this.optimized = !!b

    return this
  }

  /**
   * Set the gravity of the ParticleSystem.
   */
  setGravity (x, y) {
    this.gravity.set(x, y)

    return this
  }

  /**
  * Sets the criteria for equilibrium
  */
  setEquilibriumCriteria (particles, springs, attractions) {
    this.equilibriumCriteria.particles = !!particles
    this.equilibriumCriteria.springs = !!springs
    this.equilibriumCriteria.attractions = !!attractions
  }

  /**
   * Update the integrator
   */
  tick () {
    this.integrator.step(arguments.length === 0 ? 1 : arguments[0])

    if (this.optimized) {
      this.equilibrium = !this.needsUpdate()
    }

    return this
  }

  /**
   * Checks all springs and attractions to see if the contained particles are
   * inert / resting and returns a boolean.
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
   */
  addParticle (p) {
    this.particles.push(p)

    return this
  }

  /**
   * Add a spring to the ParticleSystem.
   */
  addSpring (s) {
    this.springs.push(s)

    return this
  }

  /**
   * Add an attraction to the ParticleSystem.
   */
  addAttraction (a) {
    this.attractions.push(a)

    return this
  }

  /**
   * Makes and then adds Particle to ParticleSystem.
   */
  makeParticle (m, x = 0, y = 0) {
    const mass = utils.isNumeric(m) ? m : 1.0

    const p = new Particle(mass, x, y)

    this.addParticle(p)

    return p
  }

  /**
   * Makes and then adds Spring to ParticleSystem.
   */
  makeSpring (a, b, k, d, l) {
    const spring = new Spring(a, b, k, d, l)

    this.addSpring(spring)

    return spring
  }

  /**
   * Makes and then adds Attraction to ParticleSystem.
   */
  makeAttraction (a, b, k, d) {
    const attraction = new Attraction(a, b, k, d)

    this.addAttraction(attraction)

    return attraction
  }

  /**
   * Wipe the ParticleSystem clean.
   */
  clear () {
    this.particles.length = 0
    this.springs.length = 0
    this.attractions.length = 0
  }

  /**
   * Calculate and apply forces.
   */
  applyForces () {
    if (!this.gravity.isZero()) {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].force.addSelf(this.gravity)
      }
    }

    const t = new Vector()

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
   * Clear all particles in the system.
   */
  clearForces () {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].clear()
    }

    return this
  }

}
