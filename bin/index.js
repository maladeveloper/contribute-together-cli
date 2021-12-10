#!/Users/malavan.srikumat/.nvm/versions/node/v12.21.0/bin/node
const { getIntervals } = require('./utils/api_get.js')
const Menu = require('./prompts/menu.js')

const main = async function () {
  // refresh the intervals
  await getIntervals()
  await Menu()
  process.exit()
}
main()
