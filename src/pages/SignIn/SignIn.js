import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMedia } from "react-use";

import classes from "./SignIn.module.css";

import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MaterialLink,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from "@mui/material";

//actions
import { userSignIn, ownerSignIn } from "../../redux/actions/authAction";
import { setAlert, resetAlert } from "../../redux/actions/alertAction";

const SignIn = ({ userSignIn, ownerSignIn, token, setAlert }) => {
  const Navigate = useNavigate();
  if (token) {
    Navigate("/");
  }
  const isMobile = useMedia("(max-width: 720px)");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (role === "user") {
      userSignIn(credentials).then((data) => {
        if (data.type === "INVALID_DATA") {
          setAlert("error", data.payload.error);
        } else {
          setAlert("success", "Sign in success");
          Navigate(-1);
        }
        setLoading(false);
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
    <form
      className={classes.form}
      onSubmit={handleSubmit}
      style={{ width: isMobile ? "90vw" : "60vw" }}
    >
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
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            Sign In
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            m: 1,
          }}
        >
          <MaterialLink component={Link} to="/user/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </MaterialLink>
        </Box>
        <Box
          sx={{
            m: 1,
          }}
        >
          <MaterialLink component={Link} to="/owner/signup" variant="body2">
            {"Want to list your parking? Sign Up"}
          </MaterialLink>
        </Box>
      </div>
    </form>
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
