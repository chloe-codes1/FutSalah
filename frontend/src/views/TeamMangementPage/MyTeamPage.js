import React, { useState, useContext, useEffect, useCallback } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

import classNames from "classnames";

// component
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import axios from "axios";

import Icon from "@material-ui/core/Icon";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

import CreateTeamDialog from "../../components/Dialog/CreateTeamDialog.js";
import UserContext from "../../contexts/UserContext.js";

const useStyles = makeStyles(styles);

function MyTeamPage(props) {
  const { userinfo } = useContext(UserContext);
  const { socialID } = userinfo;
  //console.log(socialID);
  const [myTeam, setMyTeam] = useState([]);
  useEffect(() => {
    axios({
      method: "post",
      url: "http://i3a112.p.ssafy.io:8000/api/team/my",
      data: {
        socialID: socialID,
      },
    })
      .then((res) => {
        console.log("my team list call success");
        console.log(res);
        if (res.data.length > 0) {
          setExistTeam(true);
          setMyTeam(res.data);
        }
      })
      .catch(() => {
        console.log("my team list call fail");
      });
  }, []);
  const classes = useStyles();
  const [createTeam, setCreateTeam] = useState(false);
  const [existTeam, setExistTeam] = useState(false);
  const createTeamClick = () => {
    setCreateTeam(true);
  };
  const createTeamClose = () => {
    setCreateTeam(false);
  };

  const refreshTeam = useCallback(() => {
    axios({
      method: "post",
      url: "http://i3a112.p.ssafy.io:8000/api/team/my",
      data: {
        socialID: socialID,
      },
    })
      .then((res) => {
        console.log("my team list call success");
        if (res.data.length > 0) {
          setExistTeam(true);
          setMyTeam(res.data);
        }
      })
      .catch(() => {
        console.log("my team list call fail");
      });
  });

  return (
    <>
      <CreateTeamDialog
        open={createTeam}
        onClose={createTeamClose}
        idData={userinfo.socialID}
        refreshTeam={refreshTeam}
      />
      ;
      <div>
        <Header
          brand="FutSalah"
          color="transparent"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white",
          }}
        />
        <Parallax small filter image={require("assets/img/myteambg.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs>
                <h3>나의 팀 목록</h3>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Icon className="fa fa-plus-circle" />}
                  onClick={createTeamClick}
                >
                  팀 생성
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item></Grid>
            </Grid>
          </div>
          <Divider />
          <div>
            <List>
              {!existTeam && (
                <Grid container justify="center">
                  <Grid item>
                    <h5>소속팀이 존재하지 않습니다.</h5>
                  </Grid>
                </Grid>
              )}
              {existTeam &&
                myTeam.map((team, index) => {
                  return (
                    <>
                      <ListItem key={index} button>
                        <ListItemAvatar>
                          <Avatar>logo</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={team.name} />
                        <ListItemText primary={team.description} />
                        <ListItemSecondaryAction>
                          <Link
                            to={"/teaminfo/" + team.teamID}
                            className={classes.link}
                          >
                            <Button>팀 상세</Button>
                          </Link>
                          <Button>팀 나가기</Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
            </List>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyTeamPage;
