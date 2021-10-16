const prompts = require('prompts');
const promptOpenCurrentInterval = require('./open_current_interval.js')
const promptViewIntervalHistory = require('./view_interval_history')
const choices  = [
  {
    'title':'Done',
    'value': -1
  },
  {
    'title':'Open Current Interval',
    'value':'opencurrentinterval' 
  },
  {
    'title':'View Interval History',
    'value':'viewintervalhistory' 
  },
]

module.exports = async () => {
  const staticPrompt = {
    type: 'select',
    name: 'menu',
    message: 'Menu',
    choices
  }

  let response 

  while(true){
    response = await prompts(staticPrompt)
    switch(response.menu){
      case -1:
        return
      case 'opencurrentinterval':
        await promptOpenCurrentInterval()
        break
      case 'viewintervalhistory':
        await promptViewIntervalHistory()
        break
    }
  }
}
     
     
