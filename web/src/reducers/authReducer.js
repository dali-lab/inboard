import { ActionTypes } from '../actions'

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, {
        authenticated: true,
        ...action.payload,
      })
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, { authenticated: false })
    default:
      return state
  }
}

export default AuthReducer
