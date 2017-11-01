const MAX_SAFE_INTEGER = 9007199254740991
/** Used to resolve the decompiled source of functions. */
const funcToString = Function.prototype.toString
/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty
/** Used to infer the `Object` constructor. */
const objectCtorString = funcToString.call(Object)
const objectProto = Object.prototype
const toString = objectProto.toString
const symToStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined
/**
 * 获取对象基础标识
 * @param value
 * @returns {*}
 */
const baseGetTag = (value) => {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value)
  }
  const isOwn = hasOwnProperty.call(value, symToStringTag)
  const tag = value[symToStringTag]
  let unmasked = false
  try {
    value[symToStringTag] = undefined
    unmasked = true
  } catch (e) {
  }

  const result = toString.call(value)
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag
    } else {
      delete value[symToStringTag]
    }
  }
  return result
}

/**
 * 判断是否为函数
 * @param value
 * @returns {boolean}
 */
const isFunction = value => {
  if (!isObject(value)) {
    return false
  }
  const tag = baseGetTag(value)
  return tag === '[object Function]' || tag === '[object AsyncFunction]' ||
    tag === '[object GeneratorFunction]' || tag === '[object Proxy]'
}

/**
 * 判断是否为对象
 * @param value
 * @returns {boolean}
 */
const isObject = value => {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

/**
 * 类对象
 * @param value
 * @returns {boolean}
 */
const isObjectLike = value => {
  return typeof value === 'object' && value !== null
}

/**
 * 是否为字符或者数组长度
 * @param value
 * @returns {boolean}
 */
const isLength = value => {
  return (typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER)
}

/**
 * 判断是否为数组
 * @param arr
 * @returns {boolean}
 */
const isArray = arr => {
  return Array.isArray(arr)
}

/**
 * 是否为类数组（element对象）
 * @param value
 * @returns {boolean}
 */
const isArrayLike = value => {
  return value !== null && typeof value !== 'function' && isLength(value.length)
}

/**
 * 判断是否为字符串
 * @param value
 * @returns {boolean}
 */
const isString = value => {
  const type = typeof value
  return type === 'string'
}

/**
 * 转换为数组
 * @param obj
 * @returns {Array}
 */
const toArray = (obj) => {
  let arr = []
  let i = obj.length
  while (i--) {
    arr[i] = obj[i]
  }
  return arr
}

/**
 * 判断是否为json
 * @param value
 * @returns {boolean}
 */
const isJson = (value) => {
  let _isjson = typeof (value) === 'object' &&
    (Array.toString).call(value).toLowerCase() === '[object object]' && !value.length
  return _isjson
}

/**
 * 判断是否为当前窗口
 * @param win
 * @returns {*|boolean}
 */
const isWindow = win => {
  return win && win === win.window
}

/**
 * 判断是否为document
 * @param doc
 * @returns {*|boolean}
 */
const isDocument = doc => {
  return doc && doc.nodeType === doc.DOCUMENT_NODE
}

/**
 * each
 * @param elements
 * @param callback
 * @returns {*}
 */
const each = (elements, callback) => {
  let [i, key] = []
  if (isArrayLike(elements)) {
    for (i = 0; i < elements.length; i++) {
      if (callback.call(elements[i], i, elements[i]) === false) {
        return elements
      }
    }
  } else {
    for (key in elements) {
      if (callback.call(elements[key], key, elements[key]) === false) {
        return elements
      }
    }
  }
  return elements
}

/**
 * 如果指定的参数是纯粹的对象，则返回true，否则返回fals
 * @param value
 * @returns {boolean}
 */
const isPlainObject = function (value) {
  if (!isObjectLike(value) || baseGetTag(value) !== '[object Object]') {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (typeof Ctor === 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) === objectCtorString)
}

/**
 * 深复制
 * @returns {null}
 */
const clone = function () {
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

export {
  toArray,
  isArray,
  isArrayLike,
  isLength,
  isFunction,
  isObject,
  isObjectLike,
  isPlainObject,
  clone,
  isString,
  isDocument,
  isJson,
  isWindow,
  each
}