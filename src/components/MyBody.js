import React from "react";
import Navbar from "./Navbar";

const Body = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/images/background.jpeg")`,
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
    </div>
  );
};

export default Body;
