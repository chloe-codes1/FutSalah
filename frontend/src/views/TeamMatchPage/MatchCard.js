import React, { useCallback, useState } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import MatchApplyDialog from "components/Dialog/MatchApplyDialog";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import matchComplete from "assets/img/match-complete.png";
import matchIng from "assets/img/match-ing.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 240,
    minWidth: 240,
    maxHeight: 400,
    minHeight: 400,
  },
  media: {
    height: 10,
    paddingTop: "80.25%", // 16:9
  },
  expand: {
    transform: "rotate(100deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  //   avatar: {
  //     backgroundColor: red[500],
  //   },
}));

export default function MatchCard({ match, myteam, setMyteam, userinfo }) {
  const classes = useStyles();
  const [applyOpen, setApplyOpen] = useState(false);
  const [homeTeam, setHomeTeam] = useState({
    name: "",
    wins: "",
    defeats: "",
    draws: "",
    reliability: "",
  });
  const [courtList, setCourtList] = useState([]);
  const handleApply = useCallback(() => {
    if (userinfo.logged) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/my`,
        data: { socialID: userinfo.socialID },
      }).then((e) => {
        setMyteam(e.data);
      });
      axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/` + match.homeTeamID,
      }).then((e) => {
        setHomeTeam(e.data);
      });
      axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/stadium/` + match.locationID,
      }).then((e) => {
        setCourtList(e.data);
      });
      setApplyOpen(true);
    } else {
      alert("로그인 후 이용해주세요!");
    }
  });
  const handleClose = () => {
    setApplyOpen(false);
  };
  let profileURL = match.profileURL;
  if (profileURL) {
    profileURL = process.env.REACT_APP_S3_BASE_URL + "/" + profileURL;
  } else {
    profileURL =
      process.env.REACT_APP_S3_BASE_URL + "/team-default-" + Math.ceil(Math.random() * 20) + ".png";
  }
  return (
    <>
      <Card className={classes.root}>
        {match.state === 0 && <CardHeader avatar={<img src={matchIng} />} title={match.hometeam} />}
        {match.state === 1 && (
          <CardHeader avatar={<img src={matchComplete} />} title={match.hometeam} />
        )}
        <CardActionArea onClick={handleApply}>
          {/* {match.profileURL === null && (
          <CardMedia className={classes.media} image={team1} title={match.hometeam} />
        )}
        {match.profileURL > 1 && (
          <CardMedia className={classes.media} image={profileURL} title={match.hometeam} />
        )} */}
          <CardMedia className={classes.media} image={profileURL} title={match.hometeam} />
          <CardContent>
            <Typography variant="subtitle2" color="textPrimary" component="p">
              경기방식 : {match.formCode}인 팀 매치
            </Typography>
            <Typography variant="subtitle2" color="textPrimary" component="p">
              경기일 : {match.date}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary" component="p">
              시간 : {match.time}시
            </Typography>
            <Typography variant="subtitle2" color="textPrimary" component="p">
              지역 : {match.sido} {match.gu}
            </Typography>
            {match.isBooked === 1 && (
              <Typography variant="subtitle2" color="textPrimary" component="p">
                경기장 : {match.name}
              </Typography>
            )}
            {match.isBooked === 0 && (
              <Typography variant="subtitle2" color="textPrimary" component="p">
                경기장 : 미정
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <MatchApplyDialog
        myteam={myteam}
        profileURL={profileURL}
        info={match}
        homeTeam={homeTeam}
        open={applyOpen}
        onClose={handleClose}
        courtList={courtList}
      />
    </>
  );
}
