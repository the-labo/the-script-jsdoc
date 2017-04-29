/**
 * Parse signatures
 * @function signature
 * @param {Object} data
 * @param {Object} [options={}] - Optional settings
 */
'use strict'

const { snakecase } = require('stringcase')

const paramDesc = ({ parameters = [] }) => parameters
  .map((param) => param.name)
  .filter((name) => !/\./.test(name)).join(', ')
const asClass = (item) => Object.assign({}, item, {
  functions: (item.functions || []).map((func) => Object.assign(func, {
    paramDesc: paramDesc(func)
  })),
  constructor: Object.assign(item.constructor, {
    paramDesc: paramDesc(item.constructor)
  }),
  instanceName: snakecase(item.name).split('_').pop()
})
const asFunc = (item) => Object.assign({}, item, {
  paramDesc: paramDesc(item)
})
const byName = (list, { wrapper = (item) => item }) => [].concat(list).filter(Boolean).reduce((result, item) => Object.assign(result, {
  [item.name]: wrapper(item)
}), {})

/** @lends signature */
function signature (data, otpions = {}) {
  let {
    classNames = [],
    functionNames = []
  } = otpions
  let classes = byName(data[ 'classes' ], { wrapper: asClass })

  let functions = byName(data[ 'functions' ], { wrapper: asFunc })

  return {
    classes: Object.keys(classes)
      .filter((name) => classNames.includes(name))
      .map((name) => classes[ name ]),
    functions: Object.keys(functions)
      .filter((name) => functionNames.includes(name))
      .map((name) => functions[ name ])
  }
}

module.exports = signature
