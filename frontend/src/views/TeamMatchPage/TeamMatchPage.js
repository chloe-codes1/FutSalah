import React, { useCallback, useContext, useEffect, useState } from "react";

import { Divider, Grid, List, ListItem } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
// component
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import Parallax from "components/Parallax/Parallax.js";
//import Dropdown from "components/CustomDropdown/CustomDropdown.js";
import axios from "axios";

import classNames from "classnames";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

import InfiniteScroll from "react-infinite-scroll-component";

import MatchSearch from "./MatchSearch.js";
import MatchCard from "./MatchCard.js";
import UserContext from "contexts/UserContext.js";

import NavPills from "components/NavPills/NavPills.js";
import ReceivedMatch from "./ReceivedMatch.js";
import SentMatch from "./SentMatch.js";
import UpcomingMatch from "./UpcomingMatch.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(styles);
function TeamMatchPage() {
  const classes = useStyles();
  const [matchingList, setMatchingList] = useState([]);
  const [myteam, setMyteam] = useState([]);
  const { userinfo } = useContext(UserContext);
  console.log(matchingList.length);
  // useEffect(() => {
  //   if (userinfo.logged) {
  //     axios({
  //       method: "post",
  //       url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/my`,
  //       data: { socialID: userinfo.socialID },
  //     }).then((e) => {
  //       console.log(e.data);
  //       setMyteam(e.data);
  //     });
  //   }
  // }, []);
  return (
    <div>
      <Header
        brand="FutSalah"
        color="transparent"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
      />
      <Parallax small filter image={require("assets/img/teammatch.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12}>
              {/* <h1 className={classes.title}>팀 매칭</h1> */}
              <Typography variant="h3">팀 매칭</Typography>
              <h4>원하는 상대를 찾아보세요.</h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{
          width: "75%",
          margin: "-100px auto 50px auto",
        }}
      >
        <CustomTabs
          plainTabs
          headerColor="info"
          tabs={[
            {
              tabName: "매칭 검색",
              tabContent: (
                <div className={classes.container} style={{ height: "750px" }}>
                  <MatchSearch
                    myteam={myteam}
                    setMyteam={setMyteam}
                    setMatchingList={setMatchingList}
                    userinfo={userinfo}
                  />
                  <Divider />
                  <br />
                  <Grid container justify="center" spacing={3}>
                    {matchingList.length === 0 && (
                      <Grid item>
                        <Typography variant="h6" color="textPrimary">
                          현재 등록된 매칭이 존재하지 않습니다.
                        </Typography>
                      </Grid>
                    )}
                    {!(matchingList.length === 0) &&
                      matchingList.map((match, index) => {
                        return (
                          <Grid key={index} item>
                            <MatchCard
                              myteam={myteam}
                              setMyteam={setMyteam}
                              key={index}
                              match={match}
                              userinfo={userinfo}
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </div>
              ),
            },
            {
              tabName: "받은 신청",
              tabContent: <ReceivedMatch userinfo={userinfo} />,
            },
            {
              tabName: "보낸 신청",
              tabContent: <SentMatch userinfo={userinfo} />,
            },
            {
              tabName: "예정된 매치",
              tabContent: <UpcomingMatch userinfo={userinfo} />,
            },
          ]}
        />
      </div>
      <Footer />
    </div>
  );
}

export default TeamMatchPage;
