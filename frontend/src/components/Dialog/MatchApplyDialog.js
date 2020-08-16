import React, { useState } from "react";
import Button from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    //backgroundColor: theme.palette.background.paper,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  container: {
    display: "inline",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  handleButton: {
    width: 280,
    // margin: "0 0 10px 0",
    margin: theme.spacing(1),
  },
}));

function MatchApplyDialog({ open, onClose, info, homeTeam, profileURL, myteam, courtList }) {
  const classes = useStyles();
  const [selectAway, setSelectAway] = useState("");
  const [selectCourt, setSelectCourt] = useState("");
  const handleApply = () => {
    if (info.isBooked === 0 && selectCourt === "") {
      alert("경기장을 선택하세요!!");
      return;
    }
    if (selectAway === "") {
      alert("팀을 선택하세요!!");
      return;
    }
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/waiting`,
      data: {
        matchID: info.matchID,
        teamID: selectAway,
      },
    }).then(() => {
      alert("신청완료!");
      onClose();
    });
  };
  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>매치 상세정보</DialogTitle>
        <DialogContent>
          <DialogContentText>경기방식 : {info.formCode}인 팀 매치</DialogContentText>
          <DialogContentText>경기일시 : {info.date}</DialogContentText>
          <DialogContentText>지역 : {info.gu}</DialogContentText>
          {info.isBooked === 1 && <DialogContentText>경기장 : {info.name}</DialogContentText>}
          {info.isBooked === 0 && <DialogContentText>경기장 : 미정</DialogContentText>}
          <Grid container justify="center" className={classes.container}>
            <Grid item>
              <Typography variant="h6" align="center">
                HOME TEAM
              </Typography>
            </Grid>
            {/* <Grid item >
              <Avatar src={profileURL} className={classes.large} />
            </Grid> */}
            <Grid item>
              <Typography variant="h6" align="center">
                {homeTeam.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center">
                {homeTeam.wins}승 {homeTeam.draws}무 {homeTeam.defeats}패
              </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">팀 선택</InputLabel>
                <Select
                  name="teamID"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectAway}
                  onChange={(e) => {
                    setSelectAway(e.target.value);
                    // console.log(e.target.value);
                  }}
                >
                  {myteam.length === 0 && <MenuItem value="">소속된 팀이 없습니다.</MenuItem>}
                  {myteam.length > 0 &&
                    myteam.map((team, index) => {
                      return (
                        <MenuItem key={index} value={team.teamID}>
                          {team.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            {info.isBooked === 0 && (
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">경기장 선택</InputLabel>
                  <Select
                    name="teamID"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectCourt}
                    onChange={(e) => {
                      setSelectCourt(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {courtList.length === 0 && (
                      <MenuItem value="">해당 지역에 경기장이 없습니다.</MenuItem>
                    )}
                    {courtList.length > 0 &&
                      courtList.map((court, index) => {
                        return (
                          <MenuItem key={index} value={court.courtID}>
                            {court.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {/* <Grid item xs>
              <List>
                <ListItem alignItems="center">
                  <Typography variant="h6">vs</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs>
              <List>
                <ListItem alignItems="center">
                  <Typography variant="h6">AWAY</Typography>
                </ListItem>
                <ListItem alignItems="center">
                  <Avatar />
                </ListItem>
              </List>
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              <Button variant="contained" color="success" onClick={handleApply}>
                신청
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="danger" onClick={onClose}>
                취소
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MatchApplyDialog;
