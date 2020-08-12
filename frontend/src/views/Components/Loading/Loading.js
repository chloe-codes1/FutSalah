import React from "react";
import styles from "assets/jss/material-kit-react/views/componentsSections/loadingStyle.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function Loading() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.soccer}></div>
      <h1>
        <strong>Loading...</strong>
      </h1>
    </>
  );
}
