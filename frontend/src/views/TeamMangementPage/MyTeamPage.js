import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";

import CreateTeamDialog from "../../components/Dialog/CreateTeamDialog.js";
import Footer from "components/Footer/Footer.js";
// component
import Header from "components/Header/Header.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import GridItem from "components/Grid/GridItem.js";
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
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function MyTeamPage(props) {
  const { userinfo } = useContext(UserContext);
  const [myTeam, setMyTeam] = useState([]);
  useEffect(() => {
    refreshTeam();
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
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/my`,
      data: {
        socialID: window.sessionStorage.getItem("id"),
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
                          <Link to={"/teaminfo/" + team.teamID} className={classes.link}>
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
