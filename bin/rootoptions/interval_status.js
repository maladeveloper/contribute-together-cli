const { getTaxByInterval, getPaymentByInterval, getIncByIntAveraged, getIncByIntWithSources, getAllUsers } = require('../utils/api_get')
const viewIntervalStatus = require('../views/interval_status')

module.exports = async (intervalId) => {
  // Api calls
  const allUsers = await getAllUsers()
  const payments = await getPaymentByInterval(intervalId)
  let tax = {}
  try{
    tax = await getTaxByInterval(intervalId)
  }catch(e){}
  const incomeBySource = await getIncByIntWithSources(intervalId)
  const incomeAveraged = await getIncByIntAveraged(intervalId)
  const payload = { allUsers, tax, payments, incomeBySource, incomeAveraged }

  viewIntervalStatus(payload)
}
