/* global describe, it, expect */

import Vec2 from '../lib/Vec2'

describe('Vec2', () => {
  it('should create instance with default value', () => {
    expect(Vec2).to.exist

    const v = new Vec2()

    expect(v).to.be.an.instanceof(Vec2)

    expect(v.x).to.equal(0)
    expect(v.y).to.equal(0)
  })

  it('should create instance with specific value', () => {
    const v = new Vec2(3, 2)

    expect(v.x).to.equal(3)
    expect(v.y).to.equal(2)
  })

  describe('set', () => {
    it('should set value', () => {
      const v = new Vec2(3, 2)

      expect(v.x).to.equal(3)
      expect(v.y).to.equal(2)

      v.set(5, 6)

      expect(v.x).to.equal(5)
      expect(v.y).to.equal(6)
    })
  })

  describe('copy', () => {
    it('should copy vector', () => {
      const v1 = new Vec2()
      const v2 = new Vec2(3, 6)

      v1.copy(v2)

      expect(v1.x).to.equal(3)
      expect(v1.y).to.equal(6)
    })
  })

  describe('clear', () => {
    it('should clear value', () => {
      const v = new Vec2(3, 6)

      v.clear()

      expect(v.x).to.equal(0)
      expect(v.y).to.equal(0)
    })
  })

  describe('add', () => {
    it('should set value to the added sum of two vectors', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(3, 6)
      const v3 = new Vec2()

      v3.add(v1, v2)

      expect(v3.x).to.equal(5)
      expect(v3.y).to.equal(9)
    })
  })

  describe('addSelf', () => {
    it('should add vector', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(3, 6)

      v1.addSelf(v2)

      expect(v1.x).to.equal(5)
      expect(v1.y).to.equal(9)
    })
  })

  describe('sub', () => {
    it('should set value to the subtracted sum of two vectors', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(1, 2)
      const v3 = new Vec2()

      v3.sub(v1, v2)

      expect(v3.x).to.equal(1)
      expect(v3.y).to.equal(1)
    })
  })

  describe('subSelf', () => {
    it('should subtract vector', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(1, 2)

      v1.subSelf(v2)

      expect(v1.x).to.equal(1)
      expect(v1.y).to.equal(1)
    })
  })

  describe('multiplySelf', () => {
    it('should multiply vector', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(2, 2)

      v1.multiplySelf(v2)

      expect(v1.x).to.equal(4)
      expect(v1.y).to.equal(6)
    })
  })

  describe('multiplyScalar', () => {
    it('should multiply with scalar', () => {
      const v = new Vec2(2, 3)

      v.multiplyScalar(3)

      expect(v.x).to.equal(6)
      expect(v.y).to.equal(9)
    })
  })

  describe('divideScalar', () => {
    it('should divide with scalar', () => {
      const v = new Vec2(2, 4)

      v.divideScalar(2)

      expect(v.x).to.equal(1)
      expect(v.y).to.equal(2)
    })
  })

  describe('negate', () => {
    it('should negate', () => {
      const v = new Vec2(2, 4)

      v.negate()

      expect(v.x).to.equal(-2)
      expect(v.y).to.equal(-4)
    })
  })

  describe('dot', () => {
    it('should return the dot product between vectors', () => {
      const v1 = new Vec2(2, 4)
      const v2 = new Vec2(1, 3)

      expect(v1.dot(v2)).to.equal(14)
    })
  })

  describe('lengthSquared', () => {
    it('should return the length squared', () => {
      const v = new Vec2(2, 4)

      expect(v.lengthSquared()).to.equal(20)
    })
  })

  describe('length', () => {
    it('should return the length', () => {
      const v = new Vec2(2, 4)

      expect(v.length()).to.equal(4.47213595499958)
    })
  })

  describe('normalize', () => {
    it('should normalize', () => {
      const v = new Vec2(2, 4)

      const norm = v.normalize()

      expect(norm.x).to.equal(0.4472135954999579)
      expect(norm.y).to.equal(0.8944271909999159)
    })
  })

  describe('distanceTo', () => {
    it('should return the distance to another vector', () => {
      const v1 = new Vec2()
      const v2 = new Vec2(2, 4)

      expect(v1.distanceTo(v2)).to.equal(4.47213595499958)
    })
  })

  describe('distanceToSquared', () => {
    it('should return the squared distance to another vector', () => {
      const v1 = new Vec2()
      const v2 = new Vec2(2, 4)

      expect(v1.distanceToSquared(v2)).to.equal(20)
    })
  })

  describe('setLength', () => {
    it('should set the length', () => {
      const v = new Vec2(5, 5)

      const len = v.setLength(10)

      expect(len.x).to.equal(7.071067811865475)
      expect(len.y).to.equal(7.071067811865475)
    })
  })

  describe('equals', () => {
    it('should return true if two vectors are equal', () => {
      const v1 = new Vec2(5, 5)
      const v2 = new Vec2(5, 5)

      expect(v1.equals(v2)).to.be.true

      v2.set(1, 1)

      expect(v1.equals(v2)).to.be.false
    })
  })

  describe('interpolate', () => {
    it('should interpolate with vector', () => {
      const v1 = new Vec2()
      const v2 = new Vec2(5, 5)

      v1.lerp(v2, 1)

      expect(v1.x).to.equal(5)
      expect(v1.y).to.equal(5)
    })
  })

  describe('isZero', () => {
    it('should return true if vector length is zero', () => {
      const v = new Vec2()

      expect(v.isZero()).to.be.true
    })
  })
})
