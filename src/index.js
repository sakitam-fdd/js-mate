import './polyfill/trim'
import ElementSelector from './element/selector'
import ajax from './ajax/ajax'

/**
 * Meta main function
 * @example
 * Mate(document).on('click', function (event) {
 *   console.log(event)
 * })
 * @param selector {String} - 选择器，可以为类名，id，字符串，Element
 * @param context {Object} - 上下文
 * @returns {ElementSelector} - Meta实例
 * @constructor
 */
const Meta = (selector, context) => {
  return new ElementSelector(selector, context)
};

Meta.ajax = ajax;
export default Meta
