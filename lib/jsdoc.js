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
const filedel = require('filedel')
const { spawn } = require('child_process')
const BASE_DIR = `${__dirname}/..`

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
    const cwd = process.cwd()
    process.chdir(dirname)

    const filenames = [].concat(src)
      .reduce((resolved, src) => [
        ...resolved,
        ...aglob.sync(path.resolve(dirname, src))
      ], [])

    yield amkdirp(path.dirname(dest))
    yield filedel(dest, { force: true })
    const out = fs.openSync(dest, 'a')
    yield new Promise((resolve, reject) => {
      const jsdoc = spawn('jsdoc', [
        ...filenames,
        ...(`-t templates/haruki -d console -q format=JSON -c ${BASE_DIR}/lib/conf.json`.split(' ').filter(Boolean))
      ], {
        cwd: BASE_DIR,
        stdio: [ 'ignore', out, 'pipe' ]
      })
      // jsdoc.stdout.on('data', (chunk) => out.write(chunk))
      jsdoc.on('close', () => resolve())
    })
    console.log(`File generated: ${dest}`)

    process.chdir(cwd)
  })
}

module.exports = jsdoc
