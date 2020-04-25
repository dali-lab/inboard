import * as React from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { authUser } from '../../../actions/authActions'
import { axiosInstance } from '../../../utils/axiosConfig'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '350px',
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    width: '325px',
  },
  field: {
    margin: '8px 0',
  },
  submitButton: {
    marginTop: '24px',
    width: '200px',
  },
})

function SignInForm(props) {
  const classes = useStyles()
  const [isLoading, setIsLoading] = React.useState(false)
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  })
  const [error, setError] = React.useState(null)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    axiosInstance()
      .post('/session', values)
      .then((response) => {
        props.authUser(response.data.token, response.data.user)
        if (props.onLoginSuccess) {
          props.onLoginSuccess()
        }
        props.history.push('/')
      })
      .catch((error) => {
        // TODO(teddy): Should probably switch based off error code
        setError('Incorrect email/password combination.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.fields}>
        <FormControl className={classes.field}>
          <InputLabel htmlFor="sign-up-email"> Email </InputLabel>
          <Input
            id="sign-in-email"
            value={values.email}
            onChange={handleChange('email')}
          />
        </FormControl>
        <FormControl className={classes.field}>
          <InputLabel htmlFor="sign-in-password">Password</InputLabel>
          <Input
            id="sign-in-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Login
        </Button>
      )}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </form>
  )
}

export default connect(null, { authUser })(SignInForm)
