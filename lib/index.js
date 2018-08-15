/**
 * JSDOC script for the-project
 * @module the-script-jsdoc
 * @version 2.0.3
 */

'use strict'

const jsdoc = require('./jsdoc')
const signature = require('./signature')
const lib = jsdoc.bind(this)

Object.assign(lib, {
  jsdoc,
  signature
})

module.exports = lib