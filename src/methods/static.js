import {isObject, extend} from '../utils/index'
import ElementSelector from '../element/selector'
import Events from '../events/index'

class Prototype extends Events {
  constructor () {
    super()
    this._events = Object.create(null)
    this._hasHookEvent = false
  }

  /**
   * 页面加载完成触发事件
   * @param callback
   * @returns {Prototype}
   */
  ready (callback) {
    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
      callback(ElementSelector)
    } else {
      this.on('DOMContentLoaded', function () {
        callback(ElementSelector)
      }, false)
    }
    return this
  }

  /**
   * 循环元素列表
   * @param callback
   * @returns {Prototype}
   */
  each (callback) {
    this.every(function (el, idx) {
      return callback.call(el, el, idx) !== false
    })
    return this
  }

  /**
   * 添加或者更新text
   * @param s
   * @param type
   * @returns {*|string}
   */
  text (s, type) {
    type = type || 'textContent'
    if (s) {
      type = this.each(e => {
        e[type] = s
      })
    } else {
      type = this[0] ? this[0][type] : ''
    }
    return type
  }

  /**
   * innerHTML
   * @param s
   * @returns {*|string}
   */
  html (s) {
    return this.text(s, 'innerHTML')
  }

  /**
   * 判断是否存在className
   * @param cls
   * @returns {boolean}
   */
  hasClass (cls) {
    let first = this[0]
    if (!(first && first.className)) return false
    return !!first.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }

  /**
   * 添加类名
   * @param cls
   * @returns {Prototype}
   */
  addClass (cls) {
    return this.each(f => {
      if (!ElementSelector(f).hasClass(cls)) {
        f.className += ' ' + cls
      }
    })
  }

  /**
   * 移除类名
   * @param cls
   * @returns {Prototype}
   */
  removeClass (cls) {
    return this.each(f => {
      if (ElementSelector(f).hasClass(cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        f.className = f.className.replace(reg, ' ')
      }
    })
  }

  /**
   * 判断实例是否相等
   * @param index <位置下标>
   * @returns {*}
   */
  eq (index) {
    return ElementSelector(this[index])
  }

  /**
   * 选择器第一个元素实例
   * @returns {*}
   */
  first () {
    return ElementSelector(this[0])
  }

  /**
   * 选择器最后一个实例
   * @returns {*}
   */
  last () {
    return ElementSelector(this[this.length - 1])
  }

  /**
   * 父元素
   * @param selector
   * @returns {HTMLElement}
   */
  parents (selector) {
    let n = ElementSelector(selector)
    let t = []
    this.each(function (e) {
      e = ElementSelector(e).parent()
      for (; e.length > 0;) {
        if (n.indexOf(e[0]) > -1) {
          t.push(e[0])
          break
        }
        e = e.parent()
      }
    })
    return ElementSelector(t)
  }

  /**
   * 子元素
   * @returns {*}
   */
  children () {
    let t = []
    this.each(e => {
      t.push.apply(t, e.childNodes)
    })
    return ElementSelector(t.filter(e => {
      return e.nodeType === 1
    }))
  }

  /**
   * 设置css
   * @param mix
   * @param value
   * @returns {*}
   */
  css (mix, value) {
    let target = {}
    if (value) {
      target[mix] = value
    } else if (isObject(mix)) {
      target = mix
    }
    if (JSON.stringify(target) !== '') {
      return this.each(ele => {
        extend(ele.style, target)
      })
    } else {
      return this[0] && getComputedStyle(this[0])[mix]
    }
  }

  /**
   * 隐藏元素
   * @returns {Prototype}
   */
  hide () {
    return this.each(ele => {
      if (ElementSelector(ele).css('display') !== 'none') {
        ElementSelector(ele).css('display', 'none')
      }
    })
  }

  /**
   * 显示元素
   * @returns {Prototype}
   */
  show () {
    return this.each(ele => {
      ElementSelector(ele).css('display', 'block')
    })
  }

  /**
   * 设置属性
   * @param name
   * @param value
   * @returns {*}
   */
  attr (name, value) {
    if (value !== undefined) {
      return this.each(ele => {
        if (name === 'value') {
          ele.value = value
        } else {
          ele.setAttribute(name, value)
        }
      })
    } else {
      return this[0] ? this[0].getAttribute(name) : ''
    }
  }

  /**
   * 设置value
   * @param value
   * @returns {*}
   */
  val (value) {
    if (!value) {
      return this[0] ? this[0].value : ''
    } else {
      return this.attr('value', value)
    }
  }

  /**
   * 移除属性
   * @param name
   * @returns {Prototype}
   */
  removeAttr (name) {
    return this.each(ele => {
      ele.removeAttribute(name)
    })
  }

  /**
   * 寻找子集元素
   * @param selector
   * @returns {*}
   */
  find (selector) {
    let target = []
    this.each(ele => {
      let list = ele.querySelectorAll(selector)
      list && target.push.apply(target, list)
    })
    return ElementSelector(target)
  }

  /**
   * 追加元素
   * @param content
   * @returns {Prototype}
   */
  append (content) {
    return this.each((e, index) => {
      if (index > 0 && (isObject(content) || content.trim() || content.trim()[0] !== '<')) {
        return false
      }
      ElementSelector(content).each(x => {
        e.appendChild(x)
      })
    })
  }

  /**
   * 添加元素
   * @param selector
   * @returns {Prototype}
   */
  appendTo (selector) {
    ElementSelector(selector).eq(0).append(this)
    return this
  }

  /**
   * 插入元素前
   * @param ref
   * @returns {Prototype}
   */
  before (ref) {
    let source = ElementSelector(ref)
    return this.each(e => {
      source.parent()[0].insertBefore(e, source[0])
    })
  }

  /**
   * 移除元素
   * @returns {Prototype}
   */
  remove () {
    return this.each(e => {
      ElementSelector(e).parent()[0].removeChild(e)
    })
  }

  /**
   * 创建自定义事件
   * @param event
   * @returns {Prototype}
   */
  trigger (event) {
    let evt = document.createEvent('HTMLEvents')
    evt.initEvent(event, true, true)
    return this.each((e) => {
      e.dispatchEvent(evt)
    })
  }
}

export default Prototype
