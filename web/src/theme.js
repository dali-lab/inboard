import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#5E5885', // Inboard Indigo
    },
    secondary: {
      main: '#F5D493', // Inboard Yellow
    },
    background: {
      default: 'white',
    },
    // info - used to present information to the user that is neutral and not necessarily important.
    info: {
      main: '#9C9C9C', // light grey
    },
    success: {
      main: '#7EBB74', // green
    },
    error: {
      main: '#CF4F4F', // red
    },
    warning: {
      main: '#EF806A' // orange
    }
  },
  overrides: {
    MuiTypography: {
      root: {
        main: '#484848', // dark grey
      },
    },
  },
})

export default responsiveFontSizes(Theme)
