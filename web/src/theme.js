import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// TODO: These are the wrong Inboard colors
const Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#4357AD', // Liberty
    },
    secondary: {
      main: '#D6A2AD', // Pastel Pink
    },
    background: {
      default: '#1C1919',
    },
    info: {
      main: '#5DD39E',
    },
  },
  overrides: {
    MuiTypography: {
      root: {
        color: '#F3EFE0',
      },
    },
  },
})

export default responsiveFontSizes(Theme)
