/**
 * Generate jsdoc
 * @function jsdoc
 * @param {string} [dirname=process.cwd()] - Project directory name
 * @param {Object} [options={}] - Optional settings
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const path = require('path')
const argx = require('argx')
const writeout = require('writeout')
const { execSync } = require('child_process')

/** @lends jsdoc */
function jsdoc (dirname = process.cwd(), options = {}) {
  let args = argx(arguments)
  options = args.pop('object') || {}
  dirname = args.shift('string') || process.cwd()

  let {
    src = [ 'lib/*.js' ],
    dest = 'jsdoc.json'
  } = options

  return co(function * () {
    let cwd = process.cwd()
    process.chdir(dirname)

    let data = execSync(`
    jsdoc ${src.map((src) => path.resolve(dirname, src)).join(' ')} -t templates/haruki -d console -q format=JSON -c lib/conf.json
`, { cwd: `${__dirname}/..` })
    data = JSON.stringify(JSON.parse(data), null, 2)
    let result = yield writeout(dest, data, {
      mkdirp: true,
      skipIfIdentical: true
    })
    if (!result.skipped) {
      console.log(`File generated: ${result.filename}`)
    }

    process.chdir(cwd)
  })
}

module.exports = jsdoc

