#!/Users/malavan.srikumat/.nvm/versions/node/v12.21.0/bin/node
const { warn, WARN, info, INFO, error, ERROR, success, SUCCESS } = require('./utils/logging.js')
const { restartServer, PORT, turnOffServer } = require('./utils/api.js')
const chalk = require('chalk')
const main = async function (){
    await turnOffServer()
    await restartServer()
}
main()
