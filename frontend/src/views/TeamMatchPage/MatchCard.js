import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

import matchIng from "assets/img/match-ing.png";
import matchEnd from "assets/img/match-end.png";
import matchComplete from "assets/img/match-complete.png";

import team1 from "assets/img/match-team1.png";
import team2 from "assets/img/match-team2.png";
import team3 from "assets/img/match-team3.png";

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

export default function MatchCard({ match }) {
  const classes = useStyles();
  const onClick = useCallback(() => {
    alert("hello!!!!");
  });
  return (
    <Card className={classes.root}>
      {match.matchState === 1 && (
        <CardHeader avatar={<img src={matchIng} />} title={match.name} />
      )}
      {match.matchState === 2 && (
        <CardHeader avatar={<img src={matchComplete} />} title={match.name} />
      )}
      {match.matchState === 3 && (
        <CardHeader avatar={<img src={matchEnd} />} title={match.name} />
      )}
      <CardActionArea onClick={onClick}>
        {match.teamImg === 1 && (
          <CardMedia
            className={classes.media}
            image={team1}
            title="Paella dish"
          />
        )}
        {match.teamImg === 2 && (
          <CardMedia
            className={classes.media}
            image={team2}
            title="Paella dish"
          />
        )}
        {match.teamImg === 3 && (
          <CardMedia
            className={classes.media}
            image={team3}
            title="Paella dish"
          />
        )}
        <CardContent>
          <Typography variant="h4">풋살 상대 구합니다.</Typography>
          <Typography variant="h6" color="textPrimary" component="p">
            경기방식 : {match.matchType}
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
            경기일시 : {match.matchDay}
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
            지역 : {match.location}
          </Typography>
          {match.stadium && (
            <Typography variant="h6" color="textPrimary" component="p">
              경기장 : 예약완료
            </Typography>
          )}
          {!match.stadium && (
            <Typography variant="h6" color="textPrimary" component="p">
              경기장 : 미정
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
