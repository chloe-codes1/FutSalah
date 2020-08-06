import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Footer from "components/Footer/Footer.js";
// component
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Icon from "@material-ui/core/Icon";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import Parallax from "components/Parallax/Parallax.js";
import UserContext from "../../contexts/UserContext.js";
import axios from "axios";

import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(styles);
function TeamMatchPage() {
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="FutSalah"
        color="transparent"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />

      <Parallax small filter image={require("assets/img/teammatch.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12}>
              <h1 className={classes.title}>팀 매칭</h1>
              <h4>팀에게 딱 맞는 매칭 상대를 검색해보세요.</h4>
              <br />
            </GridItem>
            <GridItem>
              <Button
                color="info"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-search" />
                매칭 검색
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Button>팀 매칭</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TeamMatchPage;
