import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


// TODO: use the theme colors
const useStyles = makeStyles(theme => ({
  welcomeBigText: {
    marginTop: '50px',
  },
  welcomeBigButton: {
    marginBottom: '20px',
    minWidth: '200px',
    textTransform: 'none',     
  },
  welcomeSignInText: {
    marginLeft: '10px', 
    textDecoration: 'underline'
  },
  linkNoStyle: {
    textDecoration: 'none',
    marginTop: '15px',
  },
  flexCenter: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center',
  },
  flexRowCenter: {
    display: 'flex', 
    justifyContent: 'center', 
    flexDirection: "row",
  },
}));

export default function Welcome(props) {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.flexCenter}>
        <Typography className={classes.welcomeBigText} variant="h1" gutterBottom="true">
          Make work better.
        </Typography>
      </Box>
      <Box className={classes.flexCenter} marginTop="2px">
        <Typography variant="h4" color="textPrimary">Get noticed with Inboard.</Typography>
      </Box>
      <Box className={classes.flexCenter}>
        <NavLink className={classes.linkNoStyle} to="/signup">
          <Fab variant="extended" color="primary" className={classes.welcomeBigButton}> Try Inboard now </Fab>
        </NavLink>
      </Box>
      <Box className={classes.flexRowCenter}>
        <Typography variant="subtitle1" color="textSecondary"> Already using Inboard?</Typography>
        <Box>
          <NavLink to="/signin">
            <Typography variant="subtitle1" className={classes.welcomeSignInText}>
                Sign in.
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}