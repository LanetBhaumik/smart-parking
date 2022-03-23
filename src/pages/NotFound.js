import React from "react";
import { Link } from "react-router-dom";

// css
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <h1 data-test-id="text-404">404</h1>
        <p>
          I'm afraid you've found a page that doesn't exist on Smart Parking.
          That can happen when you follow a link to something that has since
          been deleted. Or the link was incorrect to begin&nbsp;with.
        </p>
        <p>
          Sorry about that. We've logged the error for review, in case it's our
          fault.
        </p>
        <ul>
          <li>
            <Link className={classes.link} to="/">
              Go to the homepage
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default NotFound;
