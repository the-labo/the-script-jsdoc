/**
 * JSDOC script for the-project
 * @module the-script-jsdoc
 * @version 1.0.5
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