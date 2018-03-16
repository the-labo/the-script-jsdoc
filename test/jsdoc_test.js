/**
 * Test case for jsdoc.
 * Runs with mocha.
 */
'use strict'

const jsdoc = require('../lib/jsdoc.js')
const assert = require('assert')

describe('jsdoc', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Jsdoc', async () => {
    await jsdoc(
      `${__dirname}/../misc/mocks/mock-project-01`
    )
  })
})

/* global describe, before, after, it */
