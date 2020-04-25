import * as React from 'react'

import Page from '../../Core/Page'
import SignInForm from './SignInForm'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

function SignInPage(props) {
  const classes = useStyles()

  if (props.auth.authenticated) {
    props.history.push('/')
  }

  return (
    <Page>
      <div className={classes.root}>
        <SignInForm history={props.history} />
      </div>
    </Page>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(SignInPage)
