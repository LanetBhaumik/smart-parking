import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//material ui
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Link as MaterialLink } from "@mui/material";
//css
import classes from "./UserSignUp.module.css";

//actions
import { userSignUp } from "../../redux/actions/authAction";
import { setAlert, resetAlert } from "../../redux/actions/alertAction";
import { useMedia } from "react-use";

const UserSignUp = ({ token, userSignUp, setAlert, resetAlert }) => {
  const Navigate = useNavigate();
  if (token) {
    Navigate("/");
  }
  const isMobile = useMedia("(max-width: 720px)");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    mobileNo: "",
    car: "",
  });

  const { name, email, password, conPassword, mobileNo, car } = userData;

const handleChange = (e) => {
    let { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const credIsValid = () => {
    if (mobileNo.length !== 10) {
      setAlert("error", "mobile number is invalid");
      return false;
    } else if (
      !/[A-Z]{2}[ ][0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}/.test(car.toUpperCase())
    ) {
      setAlert("error", "vehicle number is invalid");
      return false;
    } else if (password.length < 7) {
      setAlert("error", "password must be greater than 6 characters");
      return false;
    } else if (password !== conPassword) {
      setAlert("error", "Password and Confirm password does't match");

      return false;
    } else return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!credIsValid()) {
      setLoading(false);
      return;
    }
    const signUpRequest = async (userData) => {
      const data = await userSignUp(userData);
      if (data.type === "INVALID_DATA") {
        setAlert("error", data.payload.error);
      } else {
        setAlert("success", "Sign up success");
        Navigate("/parkings");
      }
      setLoading(false);
    };
    signUpRequest(userData);
  };

  return (
    <>
      <Box sx={{ width: isMobile ? "100vw" : "60vw", margin: "auto" }}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.container}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              margin="normal"
              align="center"
            >
              Sign Up
            </Typography>
            <div>
              <TextField
                id="name"
                label="name"
                variant="outlined"
                required
                type="text"
                margin="normal"
                value={name}
                name="name"
                onChange={handleChange}
                fullWidth
              />
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
                autoComplete="email"
              />
            </div>
            <div>
              <TextField
                id="mobileNo"
                label="mobileNo"
                helperText="without +91"
                variant="outlined"
                required
                type="tel"
                margin="normal"
                value={mobileNo}
                name="mobileNo"
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div>
              <TextField
                id="car"
                label="vehicle Number"
                helperText="in XX 00 XX 0000 format"
                variant="outlined"
                required
                type="text"
                margin="normal"
                value={car}
                name="car"
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
                autoComplete="password"
              />
            </div>
            <div>
              <TextField
                id="conPassword"
                label="confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                name="conPassword"
                required
                value={conPassword}
                onChange={handleChange}
                fullWidth
                autoComplete="confirm-password"
              />
            </div>
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                type="submit"
                variant="contained"
                margin="normal"
                fullWidth
                sx={{ position: "relative" }}
                disabled={loading}
              >
                Sign Up
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
            <Box sx={{ justifyContent: "center", textAlign: "center", m: 1 }}>
              <MaterialLink component={Link} to="/signin" variant="body2">
                {"Already have an account? Sign in"}
              </MaterialLink>
            </Box>
          </div>
        </form>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  userSignUp,
  setAlert,
  resetAlert,
})(UserSignUp);
