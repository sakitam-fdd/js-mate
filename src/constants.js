/**
 * 数据类型
 * @type {[string,string,string,string,string,string,string,string,string]}
 */
const DateTypes = [
  'Boolean',
  'Number',
  'String',
  'Function',
  'Array',
  'Date',
  'RegExp',
  'Object',
  'Error'
]

/**
 * 节点类型
 * @type {[number,number,number]}
 */
const ElementTypes = [1, 9, 11]

/**
 * Element RegExpression
 * @type {{}}}
 */
const RegExpression = {
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
}

const wrapMap = {
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
}

export {
  wrapMap,
  DateTypes,
  ElementTypes,
  RegExpression
}
