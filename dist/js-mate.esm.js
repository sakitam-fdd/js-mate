/*!
 * @smilefdd/js-mate v0.0.2
 * LICENSE : MIT
 * (c) 2017-2018 https://sakitam-fdd.github.io/js-mate
 */
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var MAX_SAFE_INTEGER = 9007199254740991;

var funcToString = Function.prototype.toString;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var objectCtorString = funcToString.call(Object);
var objectProto = Object.prototype;
var toString = objectProto.toString;
var symToStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined;
var byteToHex = [];
var rnds = new Array(16);
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

var baseGetTag = function baseGetTag(value) {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value);
  }
  var isOwn = hasOwnProperty.call(value, symToStringTag);
  var tag = value[symToStringTag];
  var unmasked = false;
  try {
    value[symToStringTag] = undefined;
    unmasked = true;
  } catch (e) {}

  var result = toString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
};

var isFunction = function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
};

var isObject = function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value !== null && (type === 'object' || type === 'function');
};

var isLength = function isLength(value) {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
};

var isArray = function isArray(arr) {
  return Array.isArray(arr);
};

var isArrayLike = function isArrayLike(value) {
  return value !== null && typeof value !== 'function' && isLength(value.length);
};

var toArray$1 = function toArray$$1(obj) {
  try {
    return Array.prototype.slice.call(obj);
  } catch (e) {
    var arr = [];
    var _i = obj.length;
    while (_i--) {
      arr[_i] = obj[_i];
    }
    return arr;
  }
};

var unique = function unique(arrayLike) {
  try {
    return Array.prototype.filter.call(arrayLike, function (item, idx) {
      return arrayLike.indexOf(item) === idx;
    });
  } catch (e) {
    if (!arrayLike.length) return arrayLike;
    var res = [arrayLike[0]];
    for (var _i2 = 1; _i2 < arrayLike.length; _i2++) {
      if (res.indexOf(arrayLike[_i2]) < 0) {
        res.push(arrayLike[_i2]);
      }
    }
    return res;
  }
};

var extend = function extend(target, ob) {
  for (var _i3 in ob) {
    Object.hasOwnProperty();
    target[_i3] = ob[_i3];
  }
  return target;
};

var isFormData = function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
};

var isDate = function isDate(val) {
  return toString.call(val) === '[object Date]';
};

var isString = function isString(value) {
  if (value == null) {
    return false;
  }
  return typeof value === 'string' || value.constructor !== null && value.constructor === String;
};

var bytesToUuid = function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
};

var mathRNG = function mathRNG() {
  for (var _i4 = 0, r; _i4 < 16; _i4++) {
    if ((_i4 & 0x03) === 0) r = Math.random() * 0x100000000;
    rnds[_i4] = r >>> ((_i4 & 0x03) << 3) & 0xff;
  }
  return rnds;
};

var uuid = function uuid(options, buf, offset) {
  var i = buf && offset || 0;
  if (typeof options === 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};
  var rnds = options.random || (options.rng || mathRNG)();
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }
  return buf || bytesToUuid(rnds);
};

var encode = function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
};

var isURLSearchParams = function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
};

var forEach = function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    obj = [obj];
  }
  if (Array.isArray(obj)) {
    for (var _i5 = 0, l = obj.length; _i5 < l; _i5++) {
      fn.call(null, obj[_i5], _i5, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
};

var isNull = function isNull(obj) {
  return obj == null;
};

var RegExpression = {
  singleTagRE: /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
  fragmentRE: /^\s*<(\w+|!)[^>]*>/,
  tagExpanderRE: /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
  table: document.createElement('table'),
  tableRow: document.createElement('tr'),
  containers: {
    '*': document.createElement('div'),
    'tr': document.createElement('tbody'),
    'tbody': document.createElement('table'),
    'thead': document.createElement('table'),
    'tfoot': document.createElement('table'),
    'td': document.createElement('tr'),
    'th': document.createElement('tr')
  }
};

var wrapMap = {
  legend: {
    intro: '<fieldset>',
    outro: '</fieldset>'
  },
  area: {
    intro: '<map>',
    outro: '</map>'
  },
  param: {
    intro: '<object>',
    outro: '</object>'
  },
  thead: {
    intro: '<table>',
    outro: '</table>'
  },
  tr: {
    intro: '<table><tbody>',
    outro: '</tbody></table>'
  },
  col: {
    intro: '<table><tbody></tbody><colgroup>',
    outro: '</colgroup></table>'
  },
  td: {
    intro: '<table><tbody><tr>',
    outro: '</tr></tbody></table>'
  }
};

var Events = function () {
  function Events() {
    classCallCheck(this, Events);

    this._events = Object.create(null);
    this._hasHookEvent = false;
  }

  Events.prototype.on = function on(event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this.on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);

      vm.addListener(event, fn, vm);
      if (Events.hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Events.prototype.once = function once(event, fn) {
    var vm = this;
    function on() {
      vm.off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.on(event, on);
    return vm;
  };

  Events.prototype.off = function off(event, fn) {
    var vm = this;

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this.off(event[i], fn);
      }
      return vm;
    }

    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    if (fn) {
      var cb = void 0;
      var _i = cbs.length;
      while (_i--) {
        cb = cbs[_i];
        if (cb === fn || cb.fn === fn) {
          vm.removeListener(event, fn, vm);
          cbs.splice(_i, 1);
          break;
        }
      }
    }
    return vm;
  };

  Events.prototype.emit = function emit(event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray$1(cbs) : cbs;
      var args = toArray$1(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm;
  };

  Events.prototype.addListener = function addListener(event, fn, context) {
    var vm = context || this;
    var handler = vm[event];
    if (handler) {
      return this;
    } else if (isArrayLike(vm)) {
      handler = function handler(e) {
        return fn.call(context || vm, e);
      };
      if ('addEventListener' in vm[0]) {
        vm[0].addEventListener(event, handler, false);
      } else if ('attachEvent' in vm[0]) {
        vm[0].attachEvent('on' + event, handler);
      }
      vm[event] = handler;
      return this;
    } else {
      handler = function handler(e) {
        return fn.call(context || vm, e);
      };
      if ('addEventListener' in vm) {
        vm.addEventListener(event, handler, false);
      } else if ('attachEvent' in vm) {
        vm.attachEvent('on' + event, handler);
      }
      vm[event] = handler;
      return this;
    }
  };

  Events.prototype.removeListener = function removeListener(event, fn, context) {
    var vm = this;
    var handler = vm[event];
    if (handler) {
      return this;
    } else if (isArrayLike(vm)) {
      if ('removeEventListener' in vm[0]) {
        vm[0].removeEventListener(event, handler, false);
      } else if ('detachEvent' in vm[0]) {
        vm[0].detachEvent('on' + event, handler);
      }
      vm[event] = null;
      return this;
    } else {
      if ('removeEventListener' in vm) {
        vm.removeEventListener(event, handler, false);
      } else if ('detachEvent' in vm) {
        vm.detachEvent('on' + event, handler);
      }
      vm[event] = null;
      return this;
    }
  };

  return Events;
}();

Events.hookRE = /^hook:/;

var Prototype = function (_Events) {
  inherits(Prototype, _Events);

  function Prototype() {
    classCallCheck(this, Prototype);

    var _this = possibleConstructorReturn(this, _Events.call(this));

    _this._events = Object.create(null);
    _this._hasHookEvent = false;
    return _this;
  }

  Prototype.prototype.ready = function ready(callback) {
    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
      callback(ElementSelector);
    } else {
      this.on('DOMContentLoaded', function () {
        callback(ElementSelector);
      }, false);
    }
    return this;
  };

  Prototype.prototype.each = function each$$1(callback) {
    this.every(function (el, idx) {
      return callback.call(el, el, idx) !== false;
    });
    return this;
  };

  Prototype.prototype.text = function text(s, type) {
    type = type || 'textContent';
    if (s) {
      type = this.each(function (e) {
        e[type] = s;
      });
    } else {
      type = this[0] ? this[0][type] : '';
    }
    return type;
  };

  Prototype.prototype.html = function html(s) {
    return this.text(s, 'innerHTML');
  };

  Prototype.prototype.hasClass = function hasClass(cls) {
    var first = this[0];
    if (!(first && first.className)) return false;
    return !!first.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  };

  Prototype.prototype.addClass = function addClass(cls) {
    return this.each(function (f) {
      if (!ElementSelector(f).hasClass(cls)) {
        f.className += ' ' + cls;
      }
    });
  };

  Prototype.prototype.removeClass = function removeClass(cls) {
    return this.each(function (f) {
      if (ElementSelector(f).hasClass(cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        f.className = f.className.replace(reg, ' ');
      }
    });
  };

  Prototype.prototype.eq = function eq(index) {
    return ElementSelector(this[index]);
  };

  Prototype.prototype.first = function first() {
    return ElementSelector(this[0]);
  };

  Prototype.prototype.last = function last() {
    return ElementSelector(this[this.length - 1]);
  };

  Prototype.prototype.parents = function parents(selector) {
    var n = ElementSelector(selector);
    var t = [];
    this.each(function (e) {
      e = ElementSelector(e).parent();
      for (; e.length > 0;) {
        if (n.indexOf(e[0]) > -1) {
          t.push(e[0]);
          break;
        }
        e = e.parent();
      }
    });
    return ElementSelector(t);
  };

  Prototype.prototype.children = function children() {
    var t = [];
    this.each(function (e) {
      t.push.apply(t, e.childNodes);
    });
    return ElementSelector(t.filter(function (e) {
      return e.nodeType === 1;
    }));
  };

  Prototype.prototype.css = function css(mix, value) {
    var target = {};
    if (value) {
      target[mix] = value;
    } else if (isObject(mix)) {
      target = mix;
    }
    if (JSON.stringify(target) !== '') {
      return this.each(function (ele) {
        extend(ele.style, target);
      });
    } else {
      return this[0] && getComputedStyle(this[0])[mix];
    }
  };

  Prototype.prototype.hide = function hide() {
    return this.each(function (ele) {
      if (ElementSelector(ele).css('display') !== 'none') {
        ElementSelector(ele).css('display', 'none');
      }
    });
  };

  Prototype.prototype.show = function show() {
    return this.each(function (ele) {
      ElementSelector(ele).css('display', 'block');
    });
  };

  Prototype.prototype.attr = function attr(name, value) {
    if (value !== undefined) {
      return this.each(function (ele) {
        if (name === 'value') {
          ele.value = value;
        } else {
          ele.setAttribute(name, value);
        }
      });
    } else {
      return this[0] ? this[0].getAttribute(name) : '';
    }
  };

  Prototype.prototype.val = function val(value) {
    if (!value) {
      return this[0] ? this[0].value : '';
    } else {
      return this.attr('value', value);
    }
  };

  Prototype.prototype.removeAttr = function removeAttr(name) {
    return this.each(function (ele) {
      ele.removeAttribute(name);
    });
  };

  Prototype.prototype.find = function find(selector) {
    var target = [];
    this.each(function (ele) {
      var list = ele.querySelectorAll(selector);
      list && target.push.apply(target, list);
    });
    return ElementSelector(target);
  };

  Prototype.prototype.append = function append(content) {
    return this.each(function (e, index) {
      if (index > 0 && (isObject(content) || content.trim() || content.trim()[0] !== '<')) {
        return false;
      }
      ElementSelector(content).each(function (x) {
        e.appendChild(x);
      });
    });
  };

  Prototype.prototype.appendTo = function appendTo(selector) {
    ElementSelector(selector).eq(0).append(this);
    return this;
  };

  Prototype.prototype.before = function before(ref) {
    var source = ElementSelector(ref);
    return this.each(function (e) {
      source.parent()[0].insertBefore(e, source[0]);
    });
  };

  Prototype.prototype.remove = function remove() {
    return this.each(function (e) {
      ElementSelector(e).parent()[0].removeChild(e);
    });
  };

  Prototype.prototype.trigger = function trigger(event) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, true, true);
    return this.each(function (e) {
      e.dispatchEvent(evt);
    });
  };

  return Prototype;
}(Events);

var parseDom = function parseDom(HTMLString) {
  var tmp = document.createElement('div');
  var tag = /[\w:-]+/.exec(HTMLString)[0];
  var inMap = wrapMap[tag];
  var validHTML = HTMLString.trim();
  if (inMap) {
    validHTML = inMap.intro + validHTML + inMap.outro;
  }
  tmp.insertAdjacentHTML('afterbegin', validHTML);
  var node = tmp.lastChild;
  if (inMap) {
    var i = inMap.outro.match(/</g).length;
    while (i--) {
      node = node.lastChild;
    }
  }
  tmp.textContent = '';
  return node;
};

var selectElements = function selectElements(selector) {
  var found = void 0;
  return document && /^#([\w-]+)$/.test(selector) ? (found = document.getElementById(RegExp.$1)) ? [found] : [] : Array.prototype.slice.call(/^\.([\w-]+)$/.test(selector) ? document.getElementsByClassName(RegExp.$1) : /^[\w-]+$/.test(selector) ? document.getElementsByTagName(selector) : document.querySelectorAll(selector));
};

var ElementSelector = function (_Prototype) {
  inherits(ElementSelector, _Prototype);

  function ElementSelector(selector, context) {
    classCallCheck(this, ElementSelector);

    var _this = possibleConstructorReturn(this, _Prototype.call(this));

    context = context || document;
    var domInstance = [];
    if (isFunction(selector)) {
      var _ret;

      domInstance = new ElementSelector(document).ready(selector);
      return _ret = domInstance, possibleConstructorReturn(_this, _ret);
    } else if (isString(selector)) {
      if ((selector = selector.trim()) && selector[0] === '<' && /^\s*<(\w+|!)[^>]*>/.test(selector)) {
        domInstance = [parseDom(selector)];
      } else {
        domInstance = context && context instanceof ElementSelector ? context.find(selector) : selectElements(selector);
      }
    } else if (isArray(selector)) {
      domInstance = selector;
    } else if (selector instanceof NodeList || selector instanceof HTMLCollection) {
      domInstance = toArray$1(selector);
    } else if (selector instanceof ElementSelector) {
      domInstance = selector;
    } else {
      domInstance = selector ? [selector] : [];
    }
    Array.prototype.push.apply(_this, unique(domInstance));
    return _this;
  }

  return ElementSelector;
}(Prototype);

var defaults$1 = {
  method: 'get',
  baseURL: '',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  },
  timeout: 0,
  withCredentials: false,
  paramsSerializer: '',
  onDownloadProgress: function onDownloadProgress() {},
  onUploadProgress: function onUploadProgress() {}
};

var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

var parseHeaders = function parseHeaders(headers) {
  var parsed = {},
      key = undefined,
      val = undefined,
      i = undefined;

  if (!headers) {
    return parsed;
  }
  forEach(headers.split('\n'), function (line) {
    i = line.indexOf(':');
    key = line.substr(0, i).trim().toLowerCase();
    val = line.substr(i + 1).trim();
    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

var buildURL = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams = void 0;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    forEach(params, function (val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (Array.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }
      forEach(val, function (v) {
        if (isDate(v)) {
          v = v.toISOString();
        } else if (isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }
  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
};

var combineURL = function combineURL(config) {
  var url = config.url.trim();
  var baseUrl = (config.baseURL || '').trim();
  if (!url && !baseUrl) url = location.href;
  if (url.indexOf('http') !== 0) {
    var isAbsolute = /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    if (!baseUrl) {
      var arr = location.pathname.split('/');
      arr.pop();
      baseUrl = location.protocol + '//' + location.host + (isAbsolute ? baseUrl : arr.join('/'));
    }
    url = baseUrl.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
    if (typeof document !== 'undefined') {
      var a = document.createElement('a');
      a.href = url;
      url = a.href;
    }
  }
  return url;
};

var Ajax = function () {
  function Ajax(adapter) {
    classCallCheck(this, Ajax);

    this.adapter = adapter || XMLHttpRequest;
  }

  Ajax.prototype.request = function request(config) {
    if (typeof config === 'string') {
      config = Object.assign({
        url: arguments[0]
      }, arguments[1]);
    }
    config = Object.assign({}, defaults$1, config);
    config.method = config.method.toLowerCase();

    var request = new this.adapter();
    var promise = new Promise(function (resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      request.withCredentials = !!config.withCredentials;
      var isGet = config.method === 'get';
      if (isFormData(requestData)) {
        delete requestHeaders['Content-Type'];
      }
      var url = combineURL(config);
      request.open(config.method.toUpperCase(), buildURL(url, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      request.onload = function () {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        resolve({
          data: responseData,
          status: request.status === 1223 ? 204 : request.status,
          statusText: request.status === 1223 ? 'No Content' : request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        });
        request = null;
      };
      request.onabort = function () {
        if (!request) {
          return;
        }
        reject(createError('Request aborted', config, 'ECONNABORTED', request));
        request = null;
      };
      request.onerror = function (e) {
        reject(createError('Network Error', config, null, request));
        request = null;
      };
      request.ontimeout = function () {
        reject(createError('timeout of \' ' + config.timeout + ' \'ms exceeded', config, 'ECONNABORTED', request));

        request = null;
      };
      if ('setRequestHeader' in request) {
        forEach(requestHeaders, function (val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            delete requestHeaders[key];
          } else {
            request.setRequestHeader(key, val);
          }
        });
      }
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }
      request.send(isGet ? null : requestData);
    });
    promise.request = request;
    return promise;
  };

  Ajax.prototype.get = function get$$1(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this.request(Object.assign({}, config, {
      method: 'get',
      url: url
    }));
  };

  Ajax.prototype.getJSON = function getJSON(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this.request(Object.assign({}, config, {
      method: 'get',
      url: url,
      responseType: 'json'
    }));
  };

  Ajax.prototype.jsonp = function jsonp(url) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new Promise(function (resolve, reject) {
      var prefix = options.prefix || '_jsonp_';
      var id = options.name || prefix + uuid().replace(/-/g, '_');
      var param = options.param || 'callback';
      var timeout = !isNull(options.timeout) ? options.timeout : 60000;
      var target = document.getElementsByTagName('script')[0] || document.head;
      var _ref = [],
          script = _ref[0],
          timer = _ref[1];

      if (timeout) {
        timer = setTimeout(function () {
          cleanup();
          reject(createError('timeout of \' ' + timeout + ' \'ms exceeded', options, 'ECONNABORTED', _this));
        }, timeout);
      }

      function cleanup() {
        if (script.parentNode) script.parentNode.removeChild(script);
        window[id] = function () {};
        if (timer) clearTimeout(timer);
      }

      window[id] = function (data) {
        cleanup();
        resolve(data);
      };
      url += (~url.indexOf('?') ? '&' : '?') + param + '=' + encodeURIComponent(id);
      url = url.replace('?&', '?');
      script = document.createElement('script');
      script.src = url;
      target.parentNode.insertBefore(script, target);
    });
  };

  Ajax.prototype.getImage = function getImage(img, url) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    config.responseType = 'arraybuffer';
    return this.get(url, config).then(function (imgData) {
      if (imgData) {
        var URL = window.URL || window.webkitURL;
        var onload = img.onload;
        img.onload = function () {
          if (onload) {
            onload();
          }
          URL.revokeObjectURL(img.src);
        };
        var blob = new Blob([new Uint8Array(imgData.data)], { type: imgData.contentType });
        img.cacheControl = imgData.cacheControl;
        img.expires = imgData.expires;
        img.src = imgData.data.byteLength ? URL.createObjectURL(blob) : '';
      }
    }).catch(function (error) {
      if (img.onerror) {
        img.onerror(error);
      }
    });
  };

  Ajax.prototype.post = function post(url, data) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return this.request(Object.assign({}, config, {
      method: 'post',
      url: url,
      data: data
    }));
  };

  Ajax.prototype.spread = function spread(callback) {
    return function (arr) {
      return callback.apply(null, arr);
    };
  };

  return Ajax;
}();

Ajax.createInstance = function (adapter) {
  return new Ajax(adapter);
};

var ajax = Ajax.createInstance();
ajax.create = function (adapter) {
  return Ajax.createInstance(adapter);
};

var Meta = function Meta(selector, context) {
  return new ElementSelector(selector, context);
};

Meta.ajax = ajax;

export default Meta;
