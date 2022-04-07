import React from "react";
import classes from "./ParkingItem.module.css";
import { Link } from "react-router-dom";

const ParkingItem = ({ parking }) => {
  const { _id, parkingName } = parking;
  const link = `/owner/parkings/${_id}`;

  return (
    <article className={classes["img-container"]}>
      <Link to={link}>
        <div className={classes.item}>
          <img src="https://source.unsplash.com/random" alt={parkingName} />
          <div className={classes.text}>
            <div className={classes.name}>
              <h4>{parkingName}</h4>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ParkingItem;
