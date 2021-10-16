const prompts = require('prompts');
const { getIntervals } = require('../utils/api_get.js')
const optionIntervalStatus = require('../rootoptions/interval_status') 


module.exports = async () => {
    const raw_intervals =  await getIntervals() 
    const choices =[
    {
      'title':'Done',
      'value': -1
    }]

    const format_date = ( date ) => date.split('-').reverse().join('/') 
    for( const interval of raw_intervals){
        const { start_date, end_date, id } = interval 
        choices.push({ title: `${format_date(start_date)} - ${format_date(end_date)}`, value: interval.id.toString() })
    }
    let response
    while(true){
      const response = await prompts({
        type: 'select',
        name: 'interval',
        message: 'Choose interval',
        choices
      })
      if(response.interval == -1){
        return 
      }
      else{
        await optionIntervalStatus(response.interval)  
      }
    }
    return response.interval
}
