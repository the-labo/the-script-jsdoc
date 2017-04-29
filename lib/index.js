/**
 * JSDOC script for the-project
 * @module the-script-jsdoc
 * @version 1.0.1
 */

'use strict'

const jsdoc = require('./jsdoc')
const lib = jsdoc.bind(this)

Object.assign(lib, {
  jsdoc
})

module.exports = lib