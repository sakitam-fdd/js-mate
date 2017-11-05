import {toArray, isArrayLike} from '../utils/index'

class Events {
  constructor () {
    this._events = Object.create(null)
    this._hasHookEvent = false
  }

  on (event, fn) {
    const vm = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      vm.addListener(event, fn, vm)
      if (Events.hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }

  once (event, fn) {
    const vm = this
    function on () {
      vm.off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.on(event, on)
    return vm
  }

  off (event, fn) {
    const vm = this
    // all
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.off(event[i], fn)
      }
      return vm
    }
    // specific event
    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null
      return vm
    }
    if (fn) {
      // specific handler
      let cb
      let i = cbs.length
      while (i--) {
        cb = cbs[i]
        if (cb === fn || cb.fn === fn) {
          vm.removeListener(event, fn, vm)
          cbs.splice(i, 1)
          break
        }
      }
    }
    return vm
  }

  emit (event) {
    const vm = this
    let cbs = vm._events[event]
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args)
      }
    }
    return vm
  }

  addListener (event, fn, context) {
    const vm = context || this
    let handler = vm[event]
    if (handler) {
      return this
    } else if (isArrayLike(vm)) {
      handler = function (e) {
        return fn.call(context || vm, e)
      }
      if ('addEventListener' in vm[0]) {
        vm[0].addEventListener(event, handler, false)
      } else if ('attachEvent' in vm[0]) {
        vm[0].attachEvent('on' + event, handler)
      }
      vm[event] = handler
      return this
    } else {
      handler = function (e) {
        return fn.call(context || vm, e)
      }
      if ('addEventListener' in vm) {
        vm.addEventListener(event, handler, false)
      } else if ('attachEvent' in vm) {
        vm.attachEvent('on' + event, handler)
      }
      vm[event] = handler
      return this
    }
  }

  removeListener (event, fn, context) {
    const vm = this
    let handler = vm[event]
    if (handler) {
      return this
    } else if (isArrayLike(vm)) {
      if ('removeEventListener' in vm[0]) {
        vm[0].removeEventListener(event, handler, false)
      } else if ('detachEvent' in vm[0]) {
        vm[0].detachEvent('on' + event, handler)
      }
      vm[event] = null
      return this
    } else {
      if ('removeEventListener' in vm) {
        vm.removeEventListener(event, handler, false)
      } else if ('detachEvent' in vm) {
        vm.detachEvent('on' + event, handler)
      }
      vm[event] = null
      return this
    }
  }

  static hookRE = /^hook:/
}

export default Events
