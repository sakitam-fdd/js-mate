import './polyfill/trim'
import ElementSelector from './element/selector'
function Meta (selector, context) {
  return new ElementSelector(selector, context)
}

export default Meta
