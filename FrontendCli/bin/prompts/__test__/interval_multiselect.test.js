const { getIntervals } = require('../../utils/api_get.js')
const { restartServer, PORT, turnOffServer} = require('../../utils/api.js')

const intervalsMultiselect = require('../intervals_multiselect.js')
const prompts = require('prompts');

it('return an id of an interval', async  () => {
    await restartServer()
    const i_id = (await getIntervals())[0].id
    prompts.inject([i_id.toString()])
    const interval_id = await intervalsMultiselect()  
    console.log('the interval_id' , interval_id)
})
