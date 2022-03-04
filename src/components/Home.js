import React from "react";
import Parkings from "./Parkings";

export const Home = (props) => {
  const { showAlert } = props;
  return (
    <div>
      <Parkings showAlert={showAlert} />
    </div>
  );
};

export default Home;
