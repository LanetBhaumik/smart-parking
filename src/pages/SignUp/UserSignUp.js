import React, { useState } from "react";

import { Button, TextField, Typography } from "@material-ui/core";

import classes from "../SignIn/SignIn.module.css";
import { userSignUp } from "../../redux/actions/userAuth";
import { setAlert } from "../../redux/actions/alert";
import { Link } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
import { connect } from "react-redux";
// import { ToggleButton } from "@mui/material";

const UserSignUp = ({ userSignUp, setAlert }) => {
  // const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    mobile_no: "",
    car: "",
  });

  const { name, email, password, conPassword, mobile_no, car } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value.trim(),
    });
  };

  const credIsValid = () => {
    if (mobile_no.length !== 10)
      return setAlert({
        severity: "error",
        message: "mobile_no not invalid",
      });
    else if (password.length < 7)
      return setAlert({
        severity: "error",
        message: "mobile_no not invalid",
      });
    else if (password !== conPassword)
      return setAlert({
        severity: "error",
        message: "mobile_no not invalid",
      });
    else if (!/[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}/.test(car.toUpperCase()))
      return setAlert({
        severity: "error",
        message: "mobile_no not invalid",
      });
    else return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credIsValid()) return;
    userSignUp(userData);
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
              id="name"
              label="name"
              variant="outlined"
              required
              type="text"
              margin="normal"
              value={name}
              name="name"
              onChange={handleChange}
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
            />
          </div>
          <div>
            <TextField
              id="mobile_no"
              label="mobile_no"
              variant="outlined"
              required
              type="tel"
              margin="normal"
              value={mobile_no}
              name="mobile_no"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="car"
              label="vehicle Number"
              variant="outlined"
              required
              type="text"
              margin="normal"
              value={car}
              name="car"
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
            />
          </div>
          <div>
            <Button type="submit" variant="contained" margin="normal">
              Sign Up
            </Button>
          </div>
          <div>
            <MaterialLink component={Link} to="/signin" variant="body2">
              {"Already have an account? Sign in"}
            </MaterialLink>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  userSignUp,
  setAlert,
})(UserSignUp);
