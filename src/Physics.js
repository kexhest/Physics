import rAF from 'raf'
import ParticleSystem from './ParticleSystem'

/**
 * Extended singleton instance of ParticleSystem with convenience methods for
 * Request Animation Frame.
 * @class
 */
export default class Physics extends ParticleSystem {

  constructor (gravityX, gravityY, drag) {
    super(gravityX, gravityY, drag)

    this.playing = false

    this.animations = []

    this.equilibriumCallbacks = []

    this.loop()
  }

  /**
   * Play the animation loop. Doesn't affect whether in equilibrium or not.
   */
  play () {
    if (this.playing) {
      return this
    }

    this.playing = true
    this.equilibrium = false

    return this
  }

  /**
   * Pause the animation loop. Doesn't affect whether in equilibrium or not.
   */
  pause () {
    this.playing = false

    return this
  }

  /**
   * Toggle between playing and pausing the simulation.
   */
  toggle () {
    if (this.playing) {
      this.pause()
    } else {
      this.play()
    }

    return this
  }

  onUpdate (cb) {
    if (this.animations.indexOf(cb) >= 0 || typeof cb !== 'function') {
      return this
    }

    this.animations.push(cb)

    return this
  }

  onEquilibrium (cb) {
    if (this.equilibriumCallbacks.indexOf(cb) >= 0 || typeof cb !== 'function') {
      return this
    }

    this.equilibriumCallbacks.push(cb)

    return this
  }

  /**
   * Call update after values in the system have changed and this will fire
   * it's own Request Animation Frame to update until things have settled
   * to equilibrium — at which point the system will stop updating.
   */
  update () {
    if (this.optimized && this.equilibrium) {
      return this
    }

    this.tick()

    for (var i = 0; i < this.animations.length; i++) {
      this.animations[i]()
    }

    return this
  }

  loop () {
    if (this.playing) {
      this.update()
    }

    rAF(this.loop.bind(this))
  }
}
