import './polyfill/trim'
import ElementSelector from './element/selector'
import Ajax from './ajax/ajax'
const Meta = (selector, context) => {
  return new ElementSelector(selector, context)
}

Meta.ajax = new Ajax()
export default Meta
