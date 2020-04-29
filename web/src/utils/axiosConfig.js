import axios from 'axios'

export const getRootURL = () => {
  const currentURL = window.location.hostname
  let ROOT_URL = 'https://inboard.herokuapp.com/api'

  if (currentURL.indexOf('localhost') >= 0) {
    ROOT_URL = 'http://localhost:9000/api'
  }
  return ROOT_URL
}

axios.defaults.headers.common.authorization = localStorage.getItem('token')
export const axiosInstance = () => {
  return axios.create({
    baseURL: getRootURL(),
    timeout: 5000,
  })
}
