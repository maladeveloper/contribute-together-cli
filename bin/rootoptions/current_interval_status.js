const { getIntervals } = require('../utils/api_get')
const optionIntervalStatus = require('./interval_status')

module.exports = async () => {
  const interval = (await getIntervals())[0]
  await optionIntervalStatus(interval.id)
}
