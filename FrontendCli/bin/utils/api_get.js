const axios = require('axios');
const PORT = 8000
BASE_URL = `http://127.0.0.1:${PORT}/api/`

const getAllUsers = async () => (await axios.get(BASE_URL + 'users')).data

const getIntervals = async ()=> (await axios.get(BASE_URL + 'intervals')).data

const getIncomeSourcesByUser  = async (userId) => (await axios.get(BASE_URL + `income-sources/${userId}`)).data

const getLatestIntTax = async () => (await axios.get(BASE_URL + 'tax/latest')).data 

const getPaymentByInterval = async (intervalId) =>(await axios.get(BASE_URL + `payment/${intervalId}`)).data  

const getTaxByInterval = async (intervalId) =>(await axios.get(BASE_URL + `tax/${intervalId}`)).data 

const getIncByIntWithSources = async (intervalId) =>(await axios.get(BASE_URL + `income/income-source/${intervalId}`)).data 

const getIncByIntAveraged = async (intervalId) =>(await axios.get(BASE_URL + `income/averaged/${intervalId}`)).data 

module.exports = { getIntervals,getTaxByInterval, getAllUsers, getIncomeSourcesByUser, getLatestIntTax, getPaymentByInterval, getIncByIntWithSources, getIncByIntAveraged  }
