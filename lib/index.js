import Physics from './Physics'
import Vec2 from './Vec2'
import Point from './Point'
import PointSystem from './PointSystem'
import Spring from './Spring'
import Attraction from './Attraction'
import Integrator from './Integrator'

const TRAER = {
  Attraction: Attraction,
  Integrator: Integrator,
  Physics: Physics,
  Point: Point,
  PointSystem: PointSystem,
  Spring: Spring,
  Vec2: Vec2
}

module.exports = TRAER
