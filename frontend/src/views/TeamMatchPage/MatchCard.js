import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import matchIng from "assets/img/match-ing.png";
import matchComplete from "assets/img/match-complete.png";

import axios from "axios";

import MatchApplyDialog from "components/Dialog/MatchApplyDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

export default function MatchCard({ match, myteam }) {
  console.log(match);
  const classes = useStyles();
  const [applyOpen, setApplyOpen] = useState(false);
  const [homeTeam, setHomeTeam] = useState({
    name: "",
    wins: "",
    defeats: "",
    draws: "",
    mileage: "",
  });
  const [courtList, setCourtList] = useState([]);
  const handleApply = useCallback(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/` + match.homeTeamID,
    }).then((e) => {
      console.log(e.data);
      setHomeTeam(e.data);
    });
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/stadium/` + match.locationID,
    }).then((e) => {
      console.log(e.data);
      setCourtList(e.data);
    });
    setApplyOpen(true);
  });
  const handleClose = () => {
    setApplyOpen(false);
  };
  let profileURL = match.profileURL;
  if (profileURL) {
    profileURL = process.env.REACT_APP_S3_BASE_URL + "/" + profileURL;
  } else {
    profileURL =
      process.env.REACT_APP_S3_BASE_URL + "/team-default-" + Math.ceil(Math.random(1, 8)) + ".png";
  }
  console.log(profileURL);
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
              경기일시 : {match.date}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary" component="p">
              지역 : {match.gu}
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
