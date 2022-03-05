import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    mobile_no: "",
    car_no: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, mobile_no, car_no } = credentials;
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, mobile_no, car_no }),
    });
    const json = await response.json();
    console.log(response)
    console.log(json);
    if (response.status === 201) {
      //Save the authtoken and redirect
      localStorage.setItem("token", json.token);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else if(json.error){
      props.showAlert(json.error, "danger");
    }
     else {
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
  <>
  <h2>Create an account to book your parking slot </h2>
  <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChange}
          />
        </div>
          <label htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        <div>
          <label htmlFor="mobile_no">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile_no"
            name="mobile_no"
            onChange={onChange}
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="car_no" className="form-label">
            Enter Vehicle Number
          </label>
          <input
            type="text"
            className="form-control"
            id="car_no"
            name="car_no"
            onChange={onChange}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={8}
            required
            />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={8}
            required
            />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
  </>);
};

export default Signup;
