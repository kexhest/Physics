/* global describe, it, assert */

import Vec2 from '../lib/Vec2'

describe('Vec2', () => {
  it('should create instance with default value', () => {
    assert.isDefined(Vec2)

    const v = new Vec2()

    assert.isObject(v)

    assert.equal(v.x, 0)
    assert.equal(v.y, 0)
  })

  it('should create instance with specific value', () => {
    const v = new Vec2(3, 2)

    assert.equal(v.x, 3)
    assert.equal(v.y, 2)
  })

  describe('set', () => {
    it('should set value', () => {
      const v = new Vec2(3, 2)

      assert.equal(v.x, 3)
      assert.equal(v.y, 2)

      v.set(5, 6)

      assert.equal(v.x, 5)
      assert.equal(v.y, 6)
    })
  })

  describe('copy', () => {
    it('should copy vector', () => {
      const v1 = new Vec2()
      const v2 = new Vec2(3, 6)

      v1.copy(v2)

      assert.equal(v1.x, 3)
      assert.equal(v1.y, 6)
    })
  })

  describe('clear', () => {
    it('should clear value', () => {
      const v = new Vec2(3, 6)

      v.clear()

      assert.equal(v.x, 0)
      assert.equal(v.y, 0)
    })
  })

  describe('add', () => {
    it('should set value to the added sum of two vectors', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(3, 6)
      const v3 = new Vec2()

      v3.add(v1, v2)

      assert.equal(v3.x, 5)
      assert.equal(v3.y, 9)
    })
  })

  describe('addSelf', () => {
    it('should add vector', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(3, 6)

      v1.addSelf(v2)

      assert.equal(v1.x, 5)
      assert.equal(v1.y, 9)
    })
  })

  describe('sub', () => {
    it('should set value to the subtracted sum of two vectors', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(1, 2)
      const v3 = new Vec2()

      v3.sub(v1, v2)

      assert.equal(v3.x, 1)
      assert.equal(v3.y, 1)
    })
  })

  describe('subSelf', () => {
    it('should subtract vector', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(1, 2)

      v1.subSelf(v2)

      assert.equal(v1.x, 1)
      assert.equal(v1.y, 1)
    })
  })

  describe('multiplySelf', () => {
    it('should multiply vector', () => {
      const v1 = new Vec2(2, 3)
      const v2 = new Vec2(2, 2)

      v1.multiplySelf(v2)

      assert.equal(v1.x, 4)
      assert.equal(v1.y, 6)
    })
  })

  describe('multiplyScalar', () => {
    it('should multiply with scalar', () => {
      const v = new Vec2(2, 3)

      v.multiplyScalar(3)

      assert.equal(v.x, 6)
      assert.equal(v.y, 9)
    })
  })

  describe('divideScalar', () => {
    it('should divide with scalar', () => {
      const v = new Vec2(2, 4)

      v.divideScalar(2)

      assert.equal(v.x, 1)
      assert.equal(v.y, 2)
    })
  })

  describe('negate', () => {
    it('should negate', () => {
      const v = new Vec2(2, 4)

      v.negate()

      assert.equal(v.x, -2)
      assert.equal(v.y, -4)
    })
  })

  describe('dot', () => {
    it('should return the dot product between vectors', () => {
      const v1 = new Vec2(2, 4)
      const v2 = new Vec2(1, 3)

      assert.equal(v1.dot(v2), 14)
    })
  })

  describe('lengthSquared', () => {
    it('should return the length squared', () => {
      const v = new Vec2(2, 4)

      assert.equal(v.lengthSquared(), 20)
    })
  })

  describe('length', () => {
    it('should return the length', () => {
      const v = new Vec2(2, 4)

      assert.equal(v.length(), 4.47213595499958)
    })
  })

  describe('normalize', () => {
    it('should normalize', () => {
      const v = new Vec2(2, 4)

      const norm = v.normalize()

      assert.equal(norm.x, 0.4472135954999579)
      assert.equal(norm.y, 0.8944271909999159)
    })
  })

  describe('distanceTo', () => {
    it('should return the distance to another vector', () => {
      const v1 = new Vec2()
      const v2 = new Vec2(2, 4)

      assert.equal(v1.distanceTo(v2), 4.47213595499958)
    })
  })

  describe('distanceToSquared', () => {
    it('should return the squared distance to another vector', () => {
      const v1 = new Vec2()
      const v2 = new Vec2(2, 4)

      assert.equal(v1.distanceToSquared(v2), 20)
    })
  })

  describe('setLength', () => {
    it('should set the length', () => {
      const v = new Vec2(5, 5)

      const len = v.setLength(10)

      assert.equal(len.x, 7.071067811865475)
      assert.equal(len.y, 7.071067811865475)
    })
  })

  describe('equals', () => {
    it('should return true if two vectors are equal', () => {
      const v1 = new Vec2(5, 5)
      const v2 = new Vec2(5, 5)

      assert.isTrue(v1.equals(v2))

      v2.set(1, 1)

      assert.isFalse(v1.equals(v2))
    })
  })

  describe('interpolate', () => {
    it('should interpolate with vector', () => {
      const v1 = new Vec2()
      const v2 = new Vec2(5, 5)

      v1.lerp(v2, 1)

      assert.equal(v1.x, 5)
      assert.equal(v1.y, 5)
    })
  })

  describe('isZero', () => {
    it('should return true if vector length is zero', () => {
      const v = new Vec2()

      assert.isTrue(v.isZero())
    })
  })
})
