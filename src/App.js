import React from "react";


import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";

function App() {

  return (
    <>
      <div className="container">
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/signup"
            element={<Signup />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
