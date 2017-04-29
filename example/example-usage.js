'use strict'

const jsdoc = require('the-script-jsdoc')

async function tryExample () {
  await jsdoc('my_project_dir')
}

tryExample().catch(console.error)
