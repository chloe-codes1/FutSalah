import React from "react";

import Footer from "components/Footer/Footer.js";

// core components
import AdminHeader from "components/Header/AdminHeader.js";
import AdminHeaderLinks from "components/Header/AdminHeaderLinks.js";

// Dialogs
import Parallax from "components/Parallax/Parallax.js";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/AdminPage.js";

export default function Admin(props) {
  const { ...rest } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <div>
      <AdminHeader
        brand="FutSalah"
        color="transparent"
        rightLinks={<AdminHeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        filter
        image={require("assets/img/liveMatchbg.png")}
        style={{ alignItems: "stretch" }}
      >
        <div className={classes.container}>
          <h1>관리자 페이지</h1>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
