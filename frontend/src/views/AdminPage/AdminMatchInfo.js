import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import ReactStopwatch from "react-stopwatch";
import { useHistory } from "react-router-dom";
import ArriveInfo from "./ArriveInfo.js";

import Button from "components/CustomButtons/Button.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// core components
import AdminHeader from "components/Header/AdminHeader.js";
import AdminHeaderLinks from "components/Header/AdminHeaderLinks.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// Dialogs
import Parallax from "components/Parallax/Parallax.js";
import AdminUserContext from "../../contexts/AdminUserContext";

// @material-ui/core components
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/AdminMatchInfoPage.js";

// Pusher
// npm install pusher-js @react-native-community/netinfo
import Pusher from "pusher-js";

// Pusher
Pusher.logToConsole = true;

var pusher = new Pusher("d497d1d45ba8c0d76122", {
  cluster: "ap3",
});

const useStyles = makeStyles(styles);

export default function AdminInfo(props) {
  const { adminuserinfo, adminUserDispatch } = useContext(AdminUserContext);
  const classes = useStyles();
  const { match, ...rest } = props;
  const history = useHistory();

  const [adminuser, setAdminUser] = useState({
    adminID: 0,
    name: "",
    stadiumID: 0,
  });

  // Match API에서 받을 것
  const testMatchInfo = {
    matchID: 1,
    time: 18,
    homeTeamID: 20,
    homeName: "백석FC",
    awayTeamID: 22,
    awayName: "팀동휘",
  };
  const [matchInfo, setMatchInfo] = useState(testMatchInfo);

  // Raspberry pi에서 받을 것
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  // 이 경기장, 오늘 매치 리스트의 몇번째 경기인가?
  const initialMatchNo = Number(match.params.id);
  // Prev, Next 버튼을 위해 matchNo를 State로 만듬
  const [matchNo, setMatchNo] = useState(initialMatchNo);
  // Prev, Next 매치 존재 여부
  const [sizeOfMatch, setSizeOfMatch] = useState(0);
  // 매치 시작 여부
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  const [isMatchFinished, setIsMatchFinished] = useState(false);

  // 현재 날짜 정보 (년, 월, 일, 요일)
  const dateInfo = new Date();
  const year = dateInfo.getFullYear();
  const month = dateInfo.getMonth();
  const date = dateInfo.getDate();

  // Match API 받아오기
  const loadMatchInfo = async (m) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/fsearch/${adminuser.stadiumID}`,
    })
      .then((res) => {
        setSizeOfMatch(res.data.length);
        setMatchInfo(res.data[m - 1]);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    const stadiumID = window.sessionStorage.getItem("stadiumID");
    adminuser.stadiumID = stadiumID;
    loadMatchInfo(matchNo);
    console.log("새로고침!");
  }, []);

  var channel = pusher.subscribe("channel");
  channel.bind("event", function (data) {
    setHomeScore(data.homeScore);
    console.log(homeScore);
  });

  const toAdminInfo = () => {
    history.push(`/Admin/${adminuserinfo.stadiumID}`);
  };

  const toPrevMatch = async () => {
    setMatchNo(matchNo - 1);
    history.push(`/Admin/${adminuserinfo.stadiumID}/match/${matchNo - 1}`);
    loadMatchInfo(matchNo - 1);
  };

  const toNextMatch = async () => {
    setMatchNo(matchNo + 1);
    history.push(`/Admin/${adminuserinfo.stadiumID}/match/${matchNo + 1}`);
    loadMatchInfo(matchNo + 1);
  };

  const matchStart = () => {
    setIsMatchStarted(true);
  };

  const matchEnd = () => {
    setIsMatchFinished(true);
  };

  const matchRestart = () => {
    setIsMatchFinished(false);
  };

  const Stopwatch = () => (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      limit="02:00:00"
      onCallback={() => console.log("Finish")}
      autoStart={isMatchStarted}
      render={
        !isMatchFinished
          ? ({ formatted }) => {
              return (
                <div>
                  <h3 style={{ marginTop: "60px" }}>{formatted}</h3>
                </div>
              );
            }
          : ({}) => {
              return (
                <div>
                  <h3 style={{ marginTop: "60px" }}>00:00:00</h3>
                </div>
              );
            }
      }
    />
  );

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
          <GridContainer
            spacing={3}
            justify="center"
            style={{
              backgroundColor: "rgba( 0, 0, 0, 0.7 )",
              borderRadius: "15px",
            }}
          >
            <GridItem xs={12} className={classes.matchInfoContainer}>
              <List className={classes.list}>
                <h3>{adminuserinfo.name}</h3>
                <h3>
                  {year}-{month + 1}-{date} {matchInfo.time}:00
                </h3>
              </List>
            </GridItem>
            <GridItem xs={12}>
              <List className={classes.list}>
                <ListItem className={classes.leftListItem}>
                  <Badge badgeContent={"Home"} color="primary">
                    <h2>{matchInfo.homeName}</h2>
                  </Badge>
                  <h1>{homeScore}</h1>
                </ListItem>
                <ListItem className={classes.centerListItem}>
                  {!isMatchStarted && !isMatchFinished && (
                    <Button color="primary" size="sm" onClick={matchStart}>
                      경기시작
                    </Button>
                  )}
                  {isMatchStarted && !isMatchFinished && (
                    <Button color="secondary" size="sm" onClick={matchEnd}>
                      경기종료
                    </Button>
                  )}
                  {isMatchStarted && isMatchFinished && (
                    <Button color="secondary" size="sm" onClick={matchRestart}>
                      다시시작
                    </Button>
                  )}
                  <Stopwatch />
                </ListItem>
                <ListItem className={classes.rightListItem}>
                  <Badge badgeContent={"Away"} color="secondary">
                    <h2>{matchInfo.awayName}</h2>
                  </Badge>
                  <h1>{awayScore}</h1>
                </ListItem>
              </List>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem className={classes.arriveInfoContainer}>
              <ArriveInfo
                homeTeamID={matchInfo.homeTeamID}
                awayTeamID={matchInfo.awayTeamID}
                matchhour={matchInfo.time}
              />
            </GridItem>
            <GridItem className={classes.bottomButtonSet}>
              {!(matchNo === 1) && (
                <Button
                  size="sm"
                  color="primary"
                  onClick={toPrevMatch}
                  className={classes.bottomButton}
                >
                  이전 경기
                </Button>
              )}

              <Button
                size="sm"
                color="warning"
                onClick={toAdminInfo}
                className={classes.bottomButton}
              >
                목록으로
              </Button>
              {!(matchNo === sizeOfMatch) && (
                <Button
                  size="sm"
                  color="secondary"
                  onClick={toNextMatch}
                  className={classes.bottomButton}
                >
                  다음 경기
                </Button>
              )}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </div>
  );
}
