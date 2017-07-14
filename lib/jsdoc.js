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
const fs = require('fs')
const argx = require('argx')
const amkdirp = require('amkdirp')
const aglob = require('aglob')
const { spawn } = require('child_process')

/** @lends jsdoc */
function jsdoc (dirname = process.cwd(), options = {}) {
  let args = argx(arguments)
  options = args.pop('object') || {}
  dirname = args.shift('string') || process.cwd()

  let {
    src = [ 'lib/*.js', 'lib/**/*.js' ],
    dest = 'jsdoc.json'
  } = options

  return co(function * () {
    let cwd = process.cwd()
    process.chdir(dirname)

    let filenames = [].concat(src)
      .reduce((resolved, src) => [
        ...resolved,
        ...aglob.sync(path.resolve(dirname, src))
      ], [])

    yield amkdirp(path.dirname(dest))
    let out = fs.createWriteStream(dest)
    yield new Promise((resolve, reject) => {
      const jsdoc = spawn('jsdoc', [
        ...filenames,
        ...('-t templates/haruki -d console -q format=JSON -c lib/conf.json'.split(' ').filter(Boolean))
      ], {
        cwd: `${__dirname}/..`
      })
      jsdoc.stdout.on('data', (chunk) => out.write(chunk))
      jsdoc.on('close', () => resolve())
    })
    console.log(`File generated: ${dest}`)

    process.chdir(cwd)
  })
}

module.exports = jsdoc
