import React from "react";
import classes from "./ParkingItem.module.css";
import { Link } from "react-router-dom";

const ParkingItem = ({ parking }) => {
  const { _id, parking_name } = parking;
  const link = `/profile/${_id}`;

  return (
    <article className={classes["img-container"]}>
      <Link to={link}>
        <div className={classes.item}>
          <img src="https://source.unsplash.com/random" alt={parking_name} />
          <div className={classes.text}>
            <div className={classes.name}>
              <h4>{parking_name}</h4>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ParkingItem;
