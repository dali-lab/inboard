import * as React from 'react'

import { compose, createStore } from 'redux'

import App from './App'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import reducers from './reducers'

const store = createStore(
  reducers,
  {},
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
