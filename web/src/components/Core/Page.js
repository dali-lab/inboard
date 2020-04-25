import * as React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
  },
  loadingRoot: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

/* Optional Props */
// loading (default: false) => render a loading page
function Page(props) {
  const classes = useStyles()

  const LoadingContent = () => (
    <div className={classes.loadingRoot}>
      <CircularProgress size={60} />
    </div>
  )

  return (
    <div className={classes.root}>
      {props.loading ? (
        <LoadingContent />
      ) : (
        <Fade in timeout={500}>
          {props.children}
        </Fade>
      )}
    </div>
  )
}

export default Page
