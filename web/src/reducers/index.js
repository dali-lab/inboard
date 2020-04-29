import AuthReducer from './authReducer'
import { combineReducers } from 'redux'

const appReducer = combineReducers({
  auth: AuthReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'DEAUTH_USER') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
