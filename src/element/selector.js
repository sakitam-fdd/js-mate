import {isFunction, isString, isArray, toArray} from '../utils/index'
import { wrapMap } from '../constants'
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

const ElementSelector = function (selector, context) {
  context = context || document
  if (isFunction(selector)) {
    this.domInstance = new ElementSelector(document).ready(selector)
    return this.domInstance
  } else if (isString(selector)) {
    if ((selector = selector.trim()) &&
    selector[0] === '<' && /^\s*<(\w+|!)[^>]*>/.test(selector)) {
      this.domInstance = [parseDom(selector)]
    } else {
      this.domInstance = context && context instanceof ElementSelector
        ? context.find(selector)
        : selectElements(selector)
    }
  } else if (isArray(selector)) {
    // this.domInstance = sanitize(selector)
  } else if (selector instanceof NodeList ||
    selector instanceof HTMLCollection) {
    this.domInstance = toArray(selector)
  } else if (selector instanceof ElementSelector) {
    this.domInstance = selector
    return this.domInstance
  } else {
    this.domInstance = selector ? [selector] : []
  }
}

export default ElementSelector
