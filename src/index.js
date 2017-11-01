import Mate from './element/selector'
export function $ (selector, context) {
  return new Mate(selector, context)
}
