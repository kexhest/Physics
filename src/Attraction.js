import Vector from './Vector'
import * as m from './utils/math'

export default class Attraction {

  constructor (a, b, k, d) {
    this.a = a
    this.b = b
    this.constant = k
    this.on = true
    this.distanceMin = d
    this.distanceMinSquared = d * d
  }

  update () {
    const a = this.a
    const b = this.b

    if (!this.on || (a.fixed && b.fixed)) {
      return
    }

    const a2b = new Vector().sub(a.position, b.position)

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
   * Returns a boolean describing whether the spring is resting or not.
   * Convenient for knowing whether or not the spring needs another update
   * tick.
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
