import React from 'react'

import SignIn from "./SignIn";

import { Container,Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
 
const useStyles = makeStyles(theme => ({
  root: {
    padding: "50px",
  spacing:0,
  direction:"column",
  alignItems:"center",
  justifyContent:"center",
  }
}));

const Landing = () => {

  const classes = useStyles();
  return (
  <>
  <Container maxWidth="md">
  <div className={classes.root}>
    <Typography variant="h2" align='center' gutterBottom>
      Smart Parking
    </Typography>

    <Typography variant="h5" align='center' gutterBottom>
      park from home
    </Typography>
  </div>
</Container>
    <SignIn/>
   </>
  )
}

export default Landing