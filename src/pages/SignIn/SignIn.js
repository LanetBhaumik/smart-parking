import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@material-ui/core";

import classes from "./SignIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../../redux/actions/userAuth";
import { ownerSignIn } from "../../redux/actions/ownerAuth";
import { Link, useNavigate } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
// import { Alert } from '@mui/material';

const SignIn = () => {
  const auth = useSelector((state) => state.auth);
  const Navigate = useNavigate();

  const { token } = auth;

  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const { email, password, role } = credentials;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    role === "user"
      ? dispatch(userSignIn(credentials))
      : dispatch(ownerSignIn(credentials));
  };

  useEffect(() => {
    token && token !== "" && Navigate("/");
  }, [token]);

  return (
    <>
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
              Sign In To Continue
            </Typography>
            <div>
              <ToggleButtonGroup
                color="primary"
                value={role}
                name="role"
                exclusive
                onChange={handleChange}
              >
                <ToggleButton name="role" value="user">
                  User
                </ToggleButton>
                <ToggleButton name="role" value="owner">
                  Owner
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
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
                Sign In
              </Button>
            </div>
            <div>
              <MaterialLink component={Link} to="/user/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </MaterialLink>
            </div>
            <div>
              <MaterialLink component={Link} to="/owner/signup" variant="body2">
                {"Want to list your parking? Sign Up"}
              </MaterialLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
