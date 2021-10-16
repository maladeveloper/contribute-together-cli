const { WARN, info, INFO, SUCCESS } = require('./logging.js')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const axios = require('axios')
const PORT = 8000
const BASE_URL = `http://127.0.0.1:${PORT}/api/`
const WAIT_SEC = 6000

const restartServer = async function () {
  try {
    await axios.get(BASE_URL)
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      INFO('Restarting mysql server ...')
      exec('mysql.server restart &')
      info('waiting 3 seconds...')
      await new Promise(res => setTimeout(() => { info('done.'); res(true) }, WAIT_SEC))

      INFO('Restarting server ...')
      exec('/Users/malavan.srikumat/Documents/Other/NewFamContribution/Backend/env/bin/python /Users/malavan.srikumat/Documents/Other/NewFamContribution/Backend/manage.py runserver &')
      info('waiting 3 seconds...')
      await new Promise(res => setTimeout(() => { info('done.'); res(true) }, WAIT_SEC))
      SUCCESS('Server...ON')
    }
  }
}

const turnOffServer = async function () {
  INFO('Stopping the server...')
  exec(`kill -9 $(lsof -t -i:${PORT}) &`)
  info('waiting 3 seconds...')
  await new Promise(res => setTimeout(() => { info('done.'); res(true) }, WAIT_SEC))
  WARN('Server...OFF')
}

module.exports = { restartServer, PORT, turnOffServer }
