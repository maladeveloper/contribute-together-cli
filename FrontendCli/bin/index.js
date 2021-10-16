#!/Users/malavan.srikumat/.nvm/versions/node/v12.21.0/bin/node
const { warn, WARN, info, INFO, error, ERROR, success, SUCCESS } = require('./utils/logging.js')
const { restartServer, PORT, turnOffServer } = require('./utils/api.js')
const { getIntervals } = require('./utils/api_get.js')
const Menu = require('./prompts/menu.js')

const main = async function (){
    await restartServer()
    //refresh the intervals
    await getIntervals()
    await Menu()
    //await turnOffServer()
    process.exit()
}
main()
