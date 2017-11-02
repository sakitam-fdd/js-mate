import mixins from '../utils/mixins'
import {isFunction, isString, isArray, toArray, unique} from '../utils/index'
import prototype from '../methods/static'
import { wrapMap } from '../constants'

/**
 * 解析html模板
 * @param HTMLString
 * @returns {Node}
 */
const parseDom = function (HTMLString) {
  let tmp = document.createElement('div')
  let tag = /[\w:-]+/.exec(HTMLString)[0]
  let inMap = wrapMap[tag]
  let validHTML = HTMLString.trim()
  if (inMap) {
    validHTML = inMap.intro + validHTML + inMap.outro
  }
  tmp.insertAdjacentHTML('afterbegin', validHTML)
  let node = tmp.lastChild
  if (inMap) {
    let i = inMap.outro.match(/</g).length
    while (i--) {
      node = node.lastChild
    }
  }
  tmp.textContent = ''
  return node
}

/**
 * 选择器
 * @param selector
 * @returns {*}
 */
const selectElements = function (selector) {
  let found
  return (document && /^#([\w-]+)$/.test(selector))
    ? ((found = document.getElementById(RegExp.$1))
      ? [found] : []) : Array.prototype.slice.call(/^\.([\w-]+)$/.test(selector)
      ? document.getElementsByClassName(RegExp.$1)
      : /^[\w-]+$/.test(selector)
        ? document.getElementsByTagName(selector)
        : document.querySelectorAll(selector))
}

/**
 * 要素选择器
 * @param selector
 * @param context
 * @returns {Array}
 * @constructor
 */
const ElementSelector = function (selector, context) {
  context = context || document
  let domInstance = []
  if (isFunction(selector)) {
    domInstance = new ElementSelector(document).ready(selector)
    return domInstance
  } else if (isString(selector)) {
    if ((selector = selector.trim()) &&
    selector[0] === '<' && /^\s*<(\w+|!)[^>]*>/.test(selector)) {
      domInstance = [parseDom(selector)]
    } else {
      domInstance = context && context instanceof ElementSelector
        ? context.find(selector)
        : selectElements(selector)
    }
  } else if (isArray(selector)) {
    domInstance = selector
  } else if (selector instanceof NodeList ||
    selector instanceof HTMLCollection) {
    domInstance = toArray(selector)
  } else if (selector instanceof ElementSelector) {
    domInstance = selector
  } else {
    domInstance = selector ? [selector] : []
  }
  Array.prototype.push.apply(this, unique(domInstance))
}
ElementSelector.prototype = Object.create(Array.prototype)
mixins(ElementSelector, prototype)
export default ElementSelector
