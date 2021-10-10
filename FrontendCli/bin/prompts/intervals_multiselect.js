const prompts = require('prompts');
const { getIntervals } = require('../utils/api_get.js')


module.exports = async () => {
    const raw_intervals =  await getIntervals() 
    const choices = []
    const format_date = ( date ) => date.split('-').reverse().join('/') 
    for( const interval of raw_intervals){
        const { start_date, end_date, id } = interval 
        choices.push({ title: `${format_date(start_date)} - ${format_date(end_date)}`, value: interval.id.toString() })
    }
    console.log(choices) 
    const response = await prompts({
      type: 'select',
      name: 'interval',
      message: 'Choose interval',
      choices
    })
    console.log('the response', response)
    return response.interval
}
