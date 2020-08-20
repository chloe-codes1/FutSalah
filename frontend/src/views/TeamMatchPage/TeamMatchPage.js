import React, { useContext, useEffect, useState } from "react";

import { Divider, Grid } from "@material-ui/core";
import Footer from "components/Footer/Footer.js";
// component
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import axios from "axios";

import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

import MatchSearch from "./MatchSearch.js";
import MatchCard from "./MatchCard.js";
import UserContext from "contexts/UserContext.js";

import ReceivedMatch from "./ReceivedMatch.js";
import SentMatch from "./SentMatch.js";
import UpcomingMatch from "./UpcomingMatch.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Typography from "@material-ui/core/Typography";
import sad from "assets/img/sad.png";

const useStyles = makeStyles(styles);
function TeamMatchPage() {
  const classes = useStyles();
  const [matchingList, setMatchingList] = useState([]);
  const [myteam, setMyteam] = useState([]);
  const { userinfo } = useContext(UserContext);
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match`,
      params: {
        date: "1900-01-01",
        formCode: 99,
        isBooked: 9,
        locationID: 999,
        time: 25,
      },
    }).then((e) => {
      setMatchingList(e.data);
    });
  }, []);
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
          headerColor="dark"
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
                      <Grid item style={{ textAlign: "center" }}>
                        <Typography variant="h6" color="textPrimary">
                          현재 등록된 매칭이 존재하지 않습니다.
                        </Typography>
                        <img src={sad} style={{ width: "50%" }} />
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
