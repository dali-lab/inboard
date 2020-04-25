import * as React from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
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
  genericError: {
    color: 'red',
  },
  submitButton: {
    marginTop: '24px',
    width: '200px',
  },
})

function SignUpForm(props) {
  const classes = useStyles()
  const [isLoading, setIsLoading] = React.useState(false)
  const [values, setValues] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    showPassword: false,
  })
  const [errors, setErrors] = React.useState({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
  })
  const [isGenericError, setIsGenericError] = React.useState(false)

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
    setErrors({})
    setIsGenericError(false)
    axiosInstance()
      .post('/user', values)
      .then((response) => {
        setIsLoading(false)
        props.authUser(response.data.token, response.data.user)
        props.history.push('/')
      })
      .catch((error) => {
        setIsLoading(false)
        if (
          error.response &&
          error.response.data &&
          error.response.data.errorType === 'INVALID_FORM'
        ) {
          setErrors(error.response.data.errorMessages)
          setIsGenericError(false)
        } else {
          setErrors({})
          setIsGenericError(true)
        }
      })
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.fields}>
        <FormControl className={classes.field} error={!!errors.email}>
          <InputLabel htmlFor="sign-up-email"> Email </InputLabel>
          <Input
            id="sign-up-email"
            value={values.email}
            onChange={handleChange('email')}
            autoComplete={'false'}
          />
          {!!errors.email && <FormHelperText>{errors.email}</FormHelperText>}
        </FormControl>
        <FormControl className={classes.field} error={!!errors.firstName}>
          <InputLabel htmlFor="sign-up-firstName"> First Name </InputLabel>
          <Input
            id="sign-up-firstName"
            value={values.firstName}
            onChange={handleChange('firstName')}
            autoComplete={'false'}
          />
          {!!errors.firstName && (
            <FormHelperText>{errors.firstName}</FormHelperText>
          )}
        </FormControl>
        <FormControl className={classes.field} error={!!errors.lastName}>
          <InputLabel htmlFor="sign-up-lastName"> Last Name </InputLabel>
          <Input
            id="sign-up-lastName"
            value={values.lastName}
            onChange={handleChange('lastName')}
            autoComplete={'false'}
          />
          {!!errors.lastName && (
            <FormHelperText>{errors.lastName}</FormHelperText>
          )}
        </FormControl>
        <FormControl className={classes.field} error={!!errors.password}>
          <InputLabel htmlFor="sign-up-password">Password</InputLabel>
          <Input
            id="sign-up-password"
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
            autoComplete={'false'}
          />
          {!!errors.password && (
            <FormHelperText>{errors.password}</FormHelperText>
          )}
        </FormControl>
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.submitButton}
        >
          Create Account
        </Button>
      )}
      {isGenericError && (
        <Typography variant="body1" color="error">
          Sorry, something went wrong. Please try again in a bit.
        </Typography>
      )}
    </form>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { authUser })(SignUpForm)
