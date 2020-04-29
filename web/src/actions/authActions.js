import { ActionTypes } from './index'
import axios from 'axios'

export const authUser = (token, user) => {
  if (token) {
    axios.defaults.headers.common.authorization = token
    localStorage.setItem('token', token)
  }
  return { type: ActionTypes.AUTH_USER, payload: user }
}

export const deauthUser = () => {
  localStorage.removeItem('token')
  axios.defaults.headers.common.authorization = ''
  return { type: ActionTypes.DEAUTH_USER }
}
