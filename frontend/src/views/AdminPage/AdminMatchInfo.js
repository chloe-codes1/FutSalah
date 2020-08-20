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

// Dialogs
import Parallax from "components/Parallax/Parallax.js";
import AdminUserContext from "../../contexts/AdminUserContext";

// @material-ui/core components
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";
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
  console.log(homeScore);
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
  // 지각 여부
  const [homeTeamLateStatus, setHomeTeamLateStatus] = useState(0);
  const [awayTeamLateStatus, setAwayTeamLateStatus] = useState(0);

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

  var channel2 = pusher.subscribe("channel2");
  channel2.bind("event2", function (data) {
    setAwayScore(data.awayScore);
    console.log(awayScore);
  });

  // 경기 시작 버튼 누르면 홈팀이름, 원정팀이름, 홈팀지각여부, 원정팀지각여부 보내주기
  const sendMatchInfo = (
    homeName,
    awayName,
    homeTeamLateStatus,
    awayTeamLateStatus
  ) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/gameStart`,
      data: {
        home: homeName,
        away: awayName,
        homeLate: homeTeamLateStatus,
        awayLate: awayTeamLateStatus,
      },
    })
      .then(() => {
        console.log("경기 정보 전송 성공!");
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  // 경기 종료 버튼 누르면 매치ID, 홈 점수, 원정 점수, 홈팀 이름, 원정팀 이름 보내주기
  const sendMatchResult = (
    matchID,
    homeScore,
    awayScore,
    homeTeam,
    awayTeam
  ) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/gameFinish`,
      data: {
        matchID: matchID,
        homeScore: homeScore,
        awayScore: awayScore,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
      },
    })
      .then(() => {
        console.log("경기 결과 전송 성공!");
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

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
    sendMatchInfo(
      matchInfo.homeName,
      matchInfo.awayName,
      homeTeamLateStatus,
      awayTeamLateStatus
    );
  };

  const matchEnd = () => {
    setIsMatchFinished(true);
    sendMatchResult(
      matchInfo.matchID,
      homeScore,
      awayScore,
      matchInfo.homeName,
      matchInfo.awayName
    );
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
                  <h3 style={{ marginTop: "32px", marginBottom: 0 }}>
                    {formatted}
                  </h3>
                </div>
              );
            }
          : ({}) => {
              return (
                <div>
                  <h3 style={{ marginTop: "32px", marginBottom: 0 }}>
                    00:00:00
                  </h3>
                </div>
              );
            }
      }
    />
  );

  const homeTeamScoreUp = () => {
    setHomeScore(homeScore + 1);
  };

  const homeTeamScoreDown = () => {
    setHomeScore(homeScore - 1);
  };

  const awayTeamScoreUp = () => {
    setAwayScore(awayScore + 1);
  };

  const awayTeamScoreDown = () => {
    setAwayScore(awayScore - 1);
  };

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
            <GridItem xs={12} className={classes.matchInfoContainer}>
              <GridItem xs={5} className={classes.matchInfoContent}>
                <Badge badgeContent={"Home"} color="primary">
                  <h2>{matchInfo.homeName}</h2>
                </Badge>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <IconButton></IconButton>
                  <h1>{homeScore}</h1>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <IconButton
                      style={{ color: "white", padding: "0" }}
                      aria-label="DropUpIcon"
                      onClick={homeTeamScoreUp}
                    >
                      <ArrowDropUpIcon />
                    </IconButton>
                    {homeScore !== 0 && (
                      <IconButton
                        style={{ color: "white", padding: "0" }}
                        aria-label="DropDownIcon"
                        onClick={homeTeamScoreDown}
                      >
                        <ArrowDropDownIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </GridItem>
              <GridItem xs={2} className={classes.matchInfoContent}>
                {!isMatchStarted && !isMatchFinished && (
                  <Button color="danger" size="sm" onClick={matchStart}>
                    경기시작
                  </Button>
                )}
                {isMatchStarted && !isMatchFinished && (
                  <Button color="warning" size="sm" onClick={matchEnd}>
                    경기종료
                  </Button>
                )}
                <Stopwatch />
              </GridItem>
              <GridItem xs={5} className={classes.matchInfoContent}>
                <Badge badgeContent={"Away"} color="secondary">
                  <h2>{matchInfo.awayName}</h2>
                </Badge>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <IconButton></IconButton>
                  <h1>{awayScore}</h1>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <IconButton
                      style={{ color: "white", padding: "0" }}
                      aria-label="DropUpIcon"
                      onClick={awayTeamScoreUp}
                    >
                      <ArrowDropUpIcon />
                    </IconButton>
                    {awayScore !== 0 && (
                      <IconButton
                        style={{ color: "white", padding: "0" }}
                        aria-label="DropDownIcon"
                        onClick={awayTeamScoreDown}
                      >
                        <ArrowDropDownIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </GridItem>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem className={classes.arriveInfoContainer}>
              <ArriveInfo
                homeTeamID={matchInfo.homeTeamID}
                homeName={matchInfo.homeName}
                awayTeamID={matchInfo.awayTeamID}
                awayName={matchInfo.awayName}
                matchhour={matchInfo.time}
                setHomeTeamLateStatus={setHomeTeamLateStatus}
                setAwayTeamLateStatus={setAwayTeamLateStatus}
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
