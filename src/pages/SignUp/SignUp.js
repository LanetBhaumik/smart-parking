import React, { useState } from "react";

import { Button, TextField, Typography } from "@material-ui/core";

import classes from "../SignIn/SignIn.module.css";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions/userAuth";
import { Link } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
// import { ToggleButton } from "@mui/material";

const SignUp = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    dispatch(userLogin(credentials));
  };
  return (
    <div className={classes.main}>
      <div className={classes.form}>
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            margin="normal"
            align="center"
          >
            Sign Up To Park
          </Typography>
          <div>
            <TextField
              id="email"
              label="email"
              variant="outlined"
              required
              type="email"
              margin="normal"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="password"
              label="password"
              type="password"
              variant="outlined"
              margin="normal"
              name="password"
              required
              value={password}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button type="submit" variant="contained" margin="normal">
              Sign Up
            </Button>
          </div>
          <div>
            <MaterialLink component={Link} to="/signup" variant="body2">
              {"Already have an account? Sign in"}
            </MaterialLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
