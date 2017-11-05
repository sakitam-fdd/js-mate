import ElementSelector from '../element/selector'
import Events from '../events/index'

class Prototype extends Events {
  constructor () {
    super()
    this._events = Object.create(null)
    this._hasHookEvent = false
  }

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

  each (callback) {
    this.every(function (el, idx) {
      return callback.call(el, el, idx) !== false
    })
    return this
  }

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

  html (s) {
    return this.text(s, 'innerHTML')
  }

  hasClass (cls) {
    let first = this[0]
    if (!(first && first.className)) return false
    return !!first.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }

  addClass (cls) {
    return this.each(f => {
      if (!ElementSelector(f).hasClass(cls)) {
        f.className += ' ' + cls
      }
    })
  }

  removeClass (cls) {
    return this.each(f => {
      if (ElementSelector(f).hasClass(cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        f.className = f.className.replace(reg, ' ')
      }
    })
  }
}

export default Prototype
