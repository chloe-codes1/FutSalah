import React from "react";
// react components for routing our app without refresh

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Ranking from "views/Components/Ranking/Ranking.js";

import mainVideo from "assets/video/main.mp4";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="FutSalah"
        color="transparent"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "dark",
        }}
        {...rest}
      />
      <GridContainer
        style={{
          position: "absolute",
          margin: 0,
          padding: 0,
          minHeight: "700px",
          width: "100%",
        }}
      >
        <GridItem
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          <video
            muted
            autoPlay
            loop
            style={{
              position: "absolute",
              padding: 0,
              width: "100%",
            }}
          >
            <source src={mainVideo} type="video/mp4" />
            <strong>Your browser does not support the video tag.</strong>
          </video>
          <div className={classes.brand}>
            <h1 className={classes.title}>FutSalah</h1>
            <h3 className={classes.subtitle}>동네축구지만 프로축구처럼</h3>
          </div>
        </GridItem>
        <GridItem
          style={{
            width: "100%",
            margin: 0,
            padding: "56.25% 0 0 0",
          }}
        >
          <div
            style={{
              width: "100%",
              overflow: "auto",
            }}
          >
            <Ranking />
          </div>
        </GridItem>
      </GridContainer>
      {/* <Footer /> */}
    </div>
  );
}
