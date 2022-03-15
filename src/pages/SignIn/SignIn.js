import React, { useEffect, useState } from "react";

import { Box, Button, TextField, Typography } from "@material-ui/core";

import classes from "./SignIn.module.css";
import { connect, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

//actions
import { userSignIn, ownerSignIn } from "../../redux/actions/authAction";

const SignIn = ({ userSignIn, ownerSignIn }) => {
  const { token } = useSelector((state) => state.auth);
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
    console.log(credentials);
    role === "user" ? userSignIn(credentials) : ownerSignIn(credentials);
  };

  useEffect(() => {
    token && token !== "" && Navigate("/");
  }, [token]);

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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { userSignIn, ownerSignIn })(SignIn);
