import React, { useCallback, useContext, useEffect, useState } from "react";

import { Divider, Grid, List, ListItem } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
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
//import Dropdown from "components/CustomDropdown/CustomDropdown.js";
import UserContext from "../../contexts/UserContext.js";
import axios from "axios";

import classNames from "classnames";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

import InfiniteScroll from "react-infinite-scroll-component";

import MatchSearch from "./MatchSearch.js";
import MatchCard from "./MatchCard.js";
import NavPills from "components/NavPills/NavPills.js";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const initialState = [
  {
    name: "일산풋볼",
    matchDay: "2020-08-12 20:00",
    matchType: "5:5",
    location: "경기도 고양시",
    teamImg: 3,
    matchState: 1,
    stadium: true,
  },
  {
    name: "멀티캠퍼스",
    matchDay: "2020-08-13 10:00",
    matchType: "5:5",
    location: "서울특별시 강남구",
    teamImg: 2,
    matchState: 1,
    stadium: true,
  },
  {
    name: "싸피풋살",
    matchDay: "2020-08-14 15:00",
    matchType: "5:5",
    location: "서울특별시 강남구",
    teamImg: 1,
    matchState: 1,
    stadium: false,
  },
  {
    name: "고양덕양",
    matchDay: "2020-08-15 17:00",
    matchType: "6:6",
    location: "경기도 고양시",
    teamImg: 2,
    matchState: 1,
    stadium: true,
  },
  {
    name: "bootcamp",
    matchDay: "2020-08-11 20:00",
    matchType: "5:5",
    location: "경기도 수원시",
    teamImg: 3,
    matchState: 2,
    stadium: true,
  },
  {
    name: "ReactJS",
    matchDay: "2020-08-13 18:00",
    matchType: "5:5",
    location: "서울특별시 강남구",
    teamImg: 2,
    matchState: 2,
    stadium: true,
  },
  {
    name: "VueJS",
    matchDay: "2020-08-14 15:00",
    matchType: "5:5",
    location: "서울특별시 강남구",
    teamImg: 1,
    matchState: 2,
    stadium: false,
  },
  {
    name: "신분당선",
    matchDay: "2020-08-15 17:00",
    matchType: "6:6",
    location: "경기도 성남시",
    teamImg: 2,
    matchState: 2,
    stadium: true,
  },
  {
    name: "교대역",
    matchDay: "2020-07-13 20:00",
    matchType: "6:6",
    location: "서울특별시 서초구",
    teamImg: 3,
    matchState: 3,
    stadium: true,
  },
  {
    name: "용인시청",
    matchDay: "2020-07-14 22:00",
    matchType: "5:5",
    location: "경기도 용인시",
    teamImg: 2,
    matchState: 3,
    stadium: true,
  },
  {
    name: "12층",
    matchDay: "2020-07-21 15:00",
    matchType: "5:5",
    location: "서울특별시 강남구",
    teamImg: 1,
    matchState: 3,
    stadium: false,
  },
  {
    name: "버거킹",
    matchDay: "2020-08-03 17:00",
    matchType: "6:6",
    location: "경기도 수원시",
    teamImg: 2,
    matchState: 3,
    stadium: true,
  },
];

const useStyles = makeStyles(styles);
function TeamMatchPage() {
  const classes = useStyles();
  const [matchingList, setMatchingList] = useState(initialState);
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

      <Parallax small image={require("assets/img/teammatch.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12}>
              <h1 className={classes.title}>팀 매칭</h1>
              <h4>원하는 상대를 찾아보세요.</h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <MatchSearch />
          <Divider />
          <br />
          {matchingList.length === 0 && (
            <Grid container justify="center">
              <Grid item>
                <h5>현재 매칭중인 팀이 존재하지 않습니다.</h5>
              </Grid>
            </Grid>
          )}
          {!(matchingList.length === 0) &&
            matchingList.map((match, index) => {
              if ((index + 1) % 3 === 0) {
                return (
                  <Grid container justify="center" spacing={3}>
                    <Grid item>
                      <MatchCard match={matchingList[index - 2]} />
                    </Grid>
                    <Grid item>
                      <MatchCard match={matchingList[index - 1]} />
                    </Grid>
                    <Grid item>
                      <MatchCard match={matchingList[index]} />
                    </Grid>
                  </Grid>
                );
              }
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TeamMatchPage;
