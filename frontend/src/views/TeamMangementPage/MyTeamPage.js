import React, { useState, useEffect, useCallback } from "react";
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

const useStyles = makeStyles(styles);

function MyTeamPage(props) {
  const [myTeam, setMyTeam] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:9999/api/team",
    }).then((res) => {
      console.log("success");
      //console.log(res);
      setMyTeam(res.data);
    });
  }, []);
  const classes = useStyles();
  const [createTeam, setCreateTeam] = useState(false);
  const socialID = "115986181695146980233";
  const createTeamClick = () => {
    setCreateTeam(true);
  };
  const createTeamClose = () => {
    setCreateTeam(false);
  };

  const refreshTeam = useCallback(() => {
    axios({
      method: "get",
      url: "http://localhost:9999/api/team",
    }).then((res) => {
      console.log("success");
      //console.log(res);
      setMyTeam(res.data);
    });
  });

  return (
    <>
      <CreateTeamDialog
        open={createTeam}
        onClose={createTeamClose}
        idData={socialID}
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
              {myTeam.map((team, index) => {
                return (
                  <>
                    <ListItem key={index} button>
                      <ListItemAvatar>
                        <Avatar>logo</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={team.name} />
                      <ListItemText primary={team.description} />
                      <ListItemSecondaryAction>
                        <Button>팀 상세</Button>
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
