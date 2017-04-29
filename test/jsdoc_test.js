/**
 * Test case for jsdoc.
 * Runs with mocha.
 */
'use strict'

const jsdoc = require('../lib/jsdoc.js')
const assert = require('assert')
const co = require('co')

describe('jsdoc', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Jsdoc', () => co(function * () {
    yield jsdoc(`${__dirname}/../misc/mocks/mock-project-01`)
  }))
})

/* global describe, before, after, it */
