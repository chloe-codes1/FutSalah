import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// core components
import AdminHeader from "components/Header/AdminHeader.js";
import AdminHeaderLinks from "components/Header/AdminHeaderLinks.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// Dialogs
import Parallax from "components/Parallax/Parallax.js";
import UserContext from "../../contexts/UserContext";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/AdminPage.js";

const useStyles = makeStyles(styles);

export default function AdminInfo(props) {
  const { userinfo, userDispatch } = useContext(UserContext);
  const classes = useStyles();
  const { ...rest } = props;

  const testMatchInfo = {
    id: 1,
    location: "고양풋살센터",
    kickofftime: "2020-08-03 18:00",
    hometeam: "백석FC",
    awayteam: "팀동휘",
  };

  const testScoreInfo = {
    id: 1,
    hometeamscore: 1,
    awayteamscore: 2,
  };

  const testArriveTimeInfo = {
    id: 1,
    hometeamarrivetime: "2020-08-03 17:58",
    awayteamarrivetime: "2020-08-03 17:49",
  };

  const [matchInfo, setMatchInfo] = useState(testMatchInfo);
  const [scoreInfo, setScoreInfo] = useState(testScoreInfo);
  const [arriveTimeInfo, setArriveTimeInfo] = useState(testArriveTimeInfo);

  const loadMatchInfo = async () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/fsearch/1`,
    })
      .then((res) => {
        console.log(res);
        setMatchInfo({
          ...res.data,
          location: "고양풋살센터",
          kickofftime: "2020-08-03 18:00",
          hometeam: "백석FC",
          awayteam: "팀동휘",
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    loadMatchInfo();
  }, []);

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
          <GridContainer spacing={3}>
            <GridItem xs={12}>
              <div style={{ display: "block" }}>
                <h3>{matchInfo.location}</h3>
                <h3>{matchInfo.kickofftime}</h3>
              </div>
            </GridItem>
            <GridItem xs={12}>
              <List className={classes.list}>
                <ListItem className={classes.leftListItem}>
                  <Button size="sm" color="primary">
                    Home
                  </Button>
                  <h1>{matchInfo.hometeam}</h1>
                  <h1>{scoreInfo.hometeamscore}</h1>
                </ListItem>
                <ListItem className={classes.centerListItem}>
                  <h1>vs</h1>
                </ListItem>
                <ListItem className={classes.rightListItem}>
                  <Button size="sm" color="secondary">
                    Away
                  </Button>
                  <h1>{matchInfo.awayteam}</h1>
                  <h1>{scoreInfo.awayteamscore}</h1>
                </ListItem>
              </List>
            </GridItem>
            <GridItem xs={12} className={classes.arriveInfoContainer}>
              <GridItem xs={4} className={classes.arriveInfo}>
                <h2>도착 정보</h2>
              </GridItem>
              <GridItem xs={8} className={classes.arriveContents}>
                <GridItem xs={12} className={classes.arriveContent}>
                  <GridItem xs={3} className={classes.arriveContentTeam}>
                    <h3>Home</h3>
                  </GridItem>
                  <GridItem xs={9} className={classes.arriveContentTime}>
                    <p>{arriveTimeInfo.hometeamarrivetime}</p>
                  </GridItem>
                </GridItem>
                <GridItem xs={12} className={classes.arriveContent}>
                  <GridItem xs={3} className={classes.arriveContentTeam}>
                    <h3>Away</h3>
                  </GridItem>
                  <GridItem xs={9} className={classes.arriveContentTime}>
                    <p>{arriveTimeInfo.awayteamarrivetime}</p>
                  </GridItem>
                </GridItem>
              </GridItem>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
