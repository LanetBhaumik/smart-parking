import React from "react";
import { useParams } from "react-router-dom";

const parking = () => {
  const params = useParams();
  console.log(params.parkingId);
  console.log("parking runs");
  return (
    <div>
      <h1>kjdsfkj</h1>
      <h1>kjdsfkj</h1>
      <h1>kjdsfkj</h1>
      <h1>kjdsfkj</h1>
      <h1>kjdsfkj</h1>
      <h1>kjdsfkj</h1>
      <h1>kjdsfkj</h1>
      <h1>kjdsfkj</h1>
      <h1>kjdsfkj</h1>
      <h1>{params.parkingId}</h1>
    </div>
  );
};

export default parking;
