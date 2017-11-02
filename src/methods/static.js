export default {
  unique (arrayLike) {
    if (!arrayLike.length) return arrayLike
    let res = [arrayLike[0]]
    for (let i = 1; i < arrayLike.length; i++) {
      if (res.indexOf(arrayLike[i]) < 0) {
        res.push(arrayLike[i])
      }
    }
    return res
  },
  extend () {
    let [options, name, src, copy, copyIsArray, _clone] = []
    let [target, length, i, deep] = [arguments[0], arguments.length, 1, false]
    // 处理深拷贝的情况
    if (typeof (target) === 'boolean') {
      deep = target
      // Skip the boolean and the target
      target = arguments[i] || {}
      i++
    }
    // 处理时，目标是一个字符串或（深拷贝可能的情况下）的东西
    if (typeof (target) !== 'object' && !isFunction(target)) {
      target = {}
    }
    if (i === length) {
      target = this
      i--
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) !== null) {
        // Extend the base object
        for (name in options) {
          src = target[name]
          copy = options[name]
          // Prevent never-ending loop
          if (target === copy) {
            continue
          }
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) ||
            (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false
              _clone = src && Array.isArray(src) ? src : []
            } else {
              _clone = src && isPlainObject(src) ? src : {}
            }
            // Never move original objects, clone them
            target[name] = clone(deep, _clone, copy)
            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    // Return the modified object
    return target
  }
}
