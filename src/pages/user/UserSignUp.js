import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

//material ui
import { Button, TextField, Typography } from "@material-ui/core";
import { Link as MaterialLink } from "@mui/material";
//css
import classes from "./UserSignUp.module.css";

//actions
import { userSignUp } from "../../redux/actions/authAction";
import { setAlert, resetAlert } from "../../redux/actions/alertAction";

const UserSignUp = ({ userSignUp, setAlert, resetAlert }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    mobile_no: "",
    car: "",
  });

  const showAlert = async (severity, message) => {
    await setAlert({
      severity,
      message,
    });
    setTimeout(() => {
      resetAlert();
    }, 2000);
  };

  const { name, email, password, conPassword, mobile_no, car } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const credIsValid = () => {
    if (mobile_no.length !== 10)
      return showAlert("error", "mobile_no not invalid");
    else if (password.length < 7)
      return showAlert("error", "password must be greater than 6 characters");
    else if (password !== conPassword)
      return showAlert("error", "Password and Confirm password does't match");
    else if (!/[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}/.test(car.toUpperCase()))
      return showAlert("error", "vehicle number is invalid");
    else return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credIsValid()) return;
    userSignUp(userData);
  };

  const { token } = useSelector((state) => state.auth);
  const Navigate = useNavigate();
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
            Sign Up To Park Your car
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
            />
          </div>
          <div>
            <TextField
              id="mobile_no"
              label="mobile_no"
              helperText="without +91"
              variant="outlined"
              required
              type="tel"
              margin="normal"
              value={mobile_no}
              name="mobile_no"
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="car"
              label="vehicle Number"
              helperText="in XX00XX000 format"
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
            />
          </div>
          <div>
            <Button type="submit" variant="contained" margin="normal" fullWidth>
              Sign Up
            </Button>
          </div>
          <div style={{ justifyContent: "center", textAlign: "center" }}>
            <MaterialLink component={Link} to="/signin" variant="body2">
              {"Already have an account? Sign in"}
            </MaterialLink>
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  userSignUp,
  setAlert,
  resetAlert,
})(UserSignUp);
