import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import Button from 'components/CustomButtons/Button.js';
import CreateTeamDialog from '../../components/Dialog/CreateTeamDialog.js';
import Footer from 'components/Footer/Footer.js';
// component
import Header from 'components/Header/Header.js';
//import GridContainer from "components/Grid/GridContainer.js";
//import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Icon from '@material-ui/core/Icon';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
import Parallax from 'components/Parallax/Parallax.js';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import UserContext from '../../contexts/UserContext.js';
import axios from 'axios';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-kit-react/views/profilePage.js';

const useStyles = makeStyles(styles);
const imageStyles = makeStyles(() => ({
  logo: {
    borderRadius: '70%',
    width: '65px',
    height: '65x',
    margin: 'auto 0 auto 5%',
  },
}));

function MyTeamPage(props) {
  const { userinfo } = useContext(UserContext);
  const [myTeam, setMyTeam] = useState([]);
  const imageClass = imageStyles();

  useEffect(() => {
    refreshTeam();
  }, []);

  const classes = useStyles();
  const [createTeam, setCreateTeam] = useState(false);
  const [existTeam, setExistTeam] = useState(false);
  const profileImage = process.env.REACT_APP_S3_BASE_URL;
  const defaultPath = '/team-default-' + Math.ceil(Math.random() * 20) + '.png';

  const createTeamClick = () => {
    setCreateTeam(true);
  };
  const createTeamClose = () => {
    setCreateTeam(false);
  };

  const leaveTeam = (teamId) => {
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/my`,
      data: {
        teamID: teamId,
        userID: userinfo.userID,
      },
    })
      .then(() => {
        // console.log("success to leave");
        refreshTeam();
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  const refreshTeam = useCallback(() => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/my`,
      data: {
        socialID: window.sessionStorage.getItem('id'),
      },
    })
      .then((res) => {
        console.log('my team list call success');
        console.log(res.data);
        if (res.data.length > 0) {
          setExistTeam(true);
          setMyTeam(res.data);
        }
      })
      .catch(() => {
        console.log('my team list call fail');
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
            color: 'white',
          }}
        />
        <Parallax small filter image={require('assets/img/myteambg.jpg')} />
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
                  color="myTeam"
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
                      <ListItem key={index}>
                        <ListItemAvatar>
                          {team.profileURL ? (
                            <img
                              src={profileImage + '/' + team.profileURL}
                              className={imageClass.logo}
                            />
                          ) : (
                            <img
                              src={profileImage + defaultPath}
                              className={imageClass.logo}
                            />
                          )}
                        </ListItemAvatar>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText
                          style={{
                            width: '25%',
                          }}
                        >
                          <Link
                            to={'/teaminfo/' + team.teamID}
                            style={{
                              color: 'black',
                            }}
                          >
                            {team.leader === Number(userinfo.userID) && (
                              <StarsRoundedIcon />
                            )}
                            {team.name}
                          </Link>
                        </ListItemText>
                        <ListItemText
                          primary={team.description}
                          style={{
                            width: '50%',
                          }}
                        />
                        <ListItemSecondaryAction
                          style={{
                            width: '15%',
                          }}
                        >
                          <Button
                            color="transparent"
                            onClick={() => {
                              if (
                                window.confirm(
                                  team.name + ' 팀을 나가겠습니까?'
                                )
                              ) {
                                leaveTeam(team.teamID);
                              }
                            }}
                            style={{
                              width: '10%',
                            }}
                          >
                            팀 나가기
                          </Button>
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
