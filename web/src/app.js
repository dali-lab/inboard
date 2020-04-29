import * as React from 'react'

import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import Page from './components/Core/Page'
import Theme from './theme'
import { authUser } from './actions/authActions'
import { axiosInstance } from './utils/axiosConfig'
import { connect } from 'react-redux'
import SignUpPage from './components/User/SignUp/SignUpPage'
import SignInPage from './components/User/SignIn/SignInPage'

const Landing = () => <div> Welcome </div>

const Root = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/signup" component={SignUpPage} />
    <Route exact path="/signin" component={SignInPage} />
  </Switch>
)

const App = withRouter(Root)

const AppWithRouter = (props) => {
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axiosInstance()
        .get('/user')
        .then((response) => {
          props.authUser(null, response.data.user)
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])
  console.log(isLoading)
  return (
    <MuiThemeProvider theme={Theme}>
      <BrowserRouter>{isLoading ? <Page loading /> : <App />}</BrowserRouter>
    </MuiThemeProvider>
  )
}

export default connect(null, { authUser })(AppWithRouter)
