/* global describe, it, sinon, expect, beforeEach, afterEach */

import Integrator from '../lib/Integrator'
import PointSystem from '../lib/PointSystem'
// import Point from '../lib/Point'

let integrator = null
let pointSystem = null

describe('Integrator', () => {
  beforeEach(() => {
    pointSystem = new PointSystem()
    integrator = new Integrator(pointSystem)
  })

  afterEach(() => {
    pointSystem = null
    integrator = null
  })

  it('should create instance', () => {
    expect(Integrator).to.exist

    expect(integrator).to.be.an.instanceof(Integrator)
    expect(integrator.system).to.be.an.instanceof(PointSystem)

    expect(integrator.originalPositions).to.be.an('array').and.be.empty
    expect(integrator.originalVelocities).to.be.an('array').and.be.empty

    expect(integrator.k1Forces).to.be.an('array').and.be.empty
    expect(integrator.k1Velocities).to.be.an('array').and.be.empty

    expect(integrator.k2Forces).to.be.an('array').and.be.empty
    expect(integrator.k2Velocities).to.be.an('array').and.be.empty

    expect(integrator.k3Forces).to.be.an('array').and.be.empty
    expect(integrator.k3Velocities).to.be.an('array').and.be.empty

    expect(integrator.k4Forces).to.be.an('array').and.be.empty
    expect(integrator.k4Velocities).to.be.an('array').and.be.empty
  })

  describe('allocatePoints', () => {
    it('should be called once and return instance of itself', () => {
      sinon.spy(integrator, 'allocatePoints')

      const allocatePoints = integrator.allocatePoints()

      expect(integrator.allocatePoints).to.have.been.calledOnce
      expect(allocatePoints).to.be.instanceof(Integrator)
    })

    it('should alocate space for new points within the system', () => {
      integrator.system.createPoint()

      const pointsLength = integrator.system.points.length

      integrator.allocatePoints()

      expect(integrator.originalPositions.length).to.equal(pointsLength)
      expect(integrator.originalVelocities.length).to.equal(pointsLength)

      expect(integrator.k1Forces.length).to.equal(pointsLength)
      expect(integrator.k1Velocities.length).to.equal(pointsLength)

      expect(integrator.k2Forces.length).to.equal(pointsLength)
      expect(integrator.k2Velocities.length).to.equal(pointsLength)

      expect(integrator.k3Forces.length).to.equal(pointsLength)
      expect(integrator.k3Velocities.length).to.equal(pointsLength)

      expect(integrator.k4Forces.length).to.equal(pointsLength)
      expect(integrator.k4Velocities.length).to.equal(pointsLength)
    })
  })

  describe('step', () => {
    it('should be called once and return instance of itself', () => {
      sinon.spy(integrator, 'step')

      const step = integrator.step()

      expect(integrator.step).to.have.been.calledOnce
      expect(step).to.be.instanceof(Integrator)
    })

    it('should apply new forces, velocities and positions to points within the system', () => {
      // integrator.system.createPoint()

      // const pointsLength = integrator.system.points.length

      // integrator.allocatePoints()

      // expect(integrator.originalPositions.length).to.equal(pointsLength)
      // expect(integrator.originalVelocities.length).to.equal(pointsLength)

      // expect(integrator.k1Forces.length).to.equal(pointsLength)
      // expect(integrator.k1Velocities.length).to.equal(pointsLength)

      // expect(integrator.k2Forces.length).to.equal(pointsLength)
      // expect(integrator.k2Velocities.length).to.equal(pointsLength)

      // expect(integrator.k3Forces.length).to.equal(pointsLength)
      // expect(integrator.k3Velocities.length).to.equal(pointsLength)

      // expect(integrator.k4Forces.length).to.equal(pointsLength)
      // expect(integrator.k4Velocities.length).to.equal(pointsLength)
    })
  })
})
