/* global describe, it, sinon, expect, beforeEach, afterEach */

import Attraction from '../lib/Attraction'
import Point from '../lib/Point'

const STRENGTH = 100
const DISTANCE = 100

let a = null
let b = null
let attraction = null
let aForceBefore = null
let bForceBefore = null

describe('Attraction', () => {
  beforeEach(() => {
    a = new Point(1, 0, 100)
    b = new Point(1, 100, 100)
    attraction = new Attraction(a, b, STRENGTH, DISTANCE)
  })

  afterEach(() => {
    a = null
    b = null
    attraction = null
  })

  it('should create instance', () => {
    expect(Attraction).to.exist

    expect(attraction).to.be.an.instanceof(Attraction)
    expect(attraction.on).to.be.true
    expect(attraction.strength).to.equal(100)
    expect(attraction.distanceMin).to.equal(100)
    expect(attraction.distanceMinSquared).to.equal(10000)
  })

  describe('update', () => {
    beforeEach(() => {
      sinon.spy(attraction, 'update')

      aForceBefore = attraction.a.force.clone()
      bForceBefore = attraction.b.force.clone()
    })

    afterEach(() => {
      sinon.spy.reset()

      aForceBefore = null
      bForceBefore = null
    })

    it('should be called once and return instance of itself', () => {
      const update = attraction.update()

      expect(attraction.update).to.have.been.calledOnce
      expect(update).to.be.instanceof(Attraction)
    })

    it('should not add forces to the points if attraction isn\'t on', () => {
      attraction.on = false

      attraction.update()

      expect(attraction.a.force).to.deep.equal(aForceBefore)
      expect(attraction.b.force).to.deep.equal(bForceBefore)
    })

    it('should not add forces to fixed points', () => {
      attraction.a.fix()

      attraction.update()

      expect(attraction.a.force).to.deep.equal(aForceBefore)
      expect(attraction.b.force).to.not.deep.equal(bForceBefore)

      expect(attraction.a.force.x).to.equal(0)
      expect(attraction.b.force.x).to.equal(-0.01)
    })

    it('should add forces to the points', () => {
      attraction.update()

      expect(attraction.a.force).to.not.deep.equal(aForceBefore)
      expect(attraction.b.force).to.not.deep.equal(bForceBefore)

      expect(attraction.a.force.x).to.equal(0.01)
      expect(attraction.b.force.x).to.equal(-0.01)
    })
  })

  describe('resting', () => {
    beforeEach(() => sinon.spy(attraction, 'resting'))
    afterEach(() => sinon.spy.reset())

    it('should be called once', () => {
      attraction.resting()

      expect(attraction.resting).to.have.been.calledOnce
    })

    it('should return true if the attraction isn\'t on', () => {
      attraction.on = false

      const resting = attraction.resting()

      expect(resting).to.be.true
    })

    it('should return true if both points are fixed', () => {
      attraction.a.fix()
      attraction.b.fix()

      const resting = attraction.resting()

      expect(resting).to.be.true
    })

    it('should return false if no points are fixed and attraction is on', () => {
      const resting = attraction.resting()

      expect(resting).to.be.false
    })
  })
})
