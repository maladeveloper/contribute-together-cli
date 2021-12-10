const axios = require('axios')
const { BASE_URL } = require('./constants')

const getAllUsers = async () => (await axios.get(BASE_URL + 'users')).data

const getIntervals = async () => (await axios.get(BASE_URL + 'intervals')).data

const getIncomeSourcesByUser = async (userId) => (await axios.get(BASE_URL + `income-sources/${userId}`)).data

const getPaymentByInterval = async (intervalId) => (await axios.get(BASE_URL + `payment/${intervalId}`)).data

const getTaxByInterval = async (intervalId) => (await axios.get(BASE_URL + `tax/${intervalId}`)).data

const getIncByIntWithSources = async (intervalId) => (await axios.get(BASE_URL + `income/income-source/${intervalId}`)).data

const getIncByIntAveraged = async (intervalId) => (await axios.get(BASE_URL + `income/averaged/${intervalId}`)).data

module.exports = { getIntervals, getTaxByInterval, getAllUsers, getIncomeSourcesByUser, getPaymentByInterval, getIncByIntWithSources, getIncByIntAveraged }
