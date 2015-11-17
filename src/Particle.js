import Vector from './Vector'

export default class Particle {

  constructor (mass, x, y) {
    this.position = new Vector(x, y)

    this.velocity = new Vector()
    this.force = new Vector()

    this.mass = mass

    this.fixed = false

    this.age = 0
    this.dead = false
  }

  /**
   * Get the distance between two particles.
   */
  distanceTo (p) {
    return this.position.distanceTo(p.position)
  }

  /**
   * Make the particle fixed in 2D space.
   */
  makeFixed () {
    this.fixed = true
    this.velocity.clear()

    return this
  }

  /**
   * Reset a particle.
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
   * Returns a boolean describing whether the particle is in movement.
   */
  resting () {
    return this.fixed || this.velocity.isZero() && this.force.isZero()
  }

}
