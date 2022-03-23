import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import classes from "./SignIn.module.css";

import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MaterialLink,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

//actions
import { userSignIn, ownerSignIn } from "../../redux/actions/authAction";
import { setAlert, resetAlert } from "../../redux/actions/alertAction";

const SignIn = ({ userSignIn, ownerSignIn, token, setAlert }) => {
  const Navigate = useNavigate();
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
    if (role === "user") {
      userSignIn(credentials).then((data) => {
        if (data.type === "INVALID_DATA") {
          setAlert("error", data.payload.error);
        } else {
          setAlert("success", "Sign in success");
          Navigate("/parkings");
        }
      });
    } else {
      ownerSignIn(credentials).then((data) => {
        if (data.type === "INVALID_DATA") {
          setAlert("error", data.payload.error);
        } else {
          setAlert("success", "Sign in success");
          Navigate("/owner/parkings");
        }
      });
    }
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.container}>
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
              fullWidth
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
              fullWidth
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
              fullWidth
            />
          </div>
          <Box margin="normal">
            <Button type="submit" variant="contained" fullWidth>
              Sign In
            </Button>
          </Box>
          <Box margin="normal">
            <MaterialLink
              component={Link}
              to="/user/signup"
              variant="body2"
              margin="normal"
            >
              {"Don't have an account? Sign Up"}
            </MaterialLink>
          </Box>
          <Box margin="normal">
            <MaterialLink
              component={Link}
              to="/owner/signup"
              variant="body2"
              margin="normal"
            >
              {"Want to list your parking? Sign Up"}
            </MaterialLink>
          </Box>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  userSignIn,
  ownerSignIn,
  setAlert,
  resetAlert,
})(SignIn);
