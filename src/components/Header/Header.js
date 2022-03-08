import React from "react";

import classes from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const loginHandler = () => {
    navigate("/login", { replace: true });
    console.log(location);
  };
  const logoutHandler = () => {
    if (window.confirm("Are You Sure?")) {
      console.log("logout");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <header className={classes.header}>
      <h1>Demo</h1>
      <ul>
        <li>
          <button onClick={loginHandler}>Login</button>
        </li>
        {/* {isLoggedIn && ( */}
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        {/* )} */}
      </ul>
    </header>
  );
};

export default Header;