import React, { useCallback, useState } from "react";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 280,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  handleButton: {
    width: 280,
    // margin: "0 0 10px 0",
    margin: theme.spacing(1),
  },
  radioButton: {
    padding: "0 30px 0 30px",
  },
}));

function MatchRegisterDialog({ open, onClose, info, area, myteam, selectedDate }) {
  const classes = useStyles();
  const [selectTeam, setSelectTeam] = useState("");
  const [selectIsBook, setSelectIsBook] = useState("1");
  const [selectCourt, setSelectCourt] = useState("");
  const [courtList, setCourtList] = useState([]);
  const handleIsBook = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/stadium/` + info.locationID,
    }).then((e) => {
      setCourtList(e.data);
    });
    setSelectIsBook(e.target.value);
  };

  const onRegister = () => {
    if (selectIsBook === "1" && selectCourt === "") {
      alert("경기장을 선택해주세요!!");
      return;
    }
    if (selectTeam === "") {
      alert("팀을 선택해주세요!!");
      return;
    }
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match`,
      data: {
        homeTeamID: selectTeam,
        locationID: info.locationID,
        courtID: selectCourt,
        isBooked: selectIsBook,
        date: info.date,
        time: info.time,
        formCode: info.type,
      },
    }).then(() => {
      alert("등록되었습니다!");
      onClose();
    });
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <img src={require("assets/img/match_register.jpg")} />
        <DialogTitle>매칭 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>원하는 매칭이 없으신가요? 직접 매칭을 등록해보세요!</DialogContentText>
          <Typography variant="subtitle2" gutterBottom>
            지역 : {area}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            일시 : {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{" "}
            {selectedDate.getDate()}일 {info.time}시
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            경기방식 : {info.type}인 팀 매치
          </Typography>
          {/* {info.isBook === "0" && <Typography variant="subtitle2">경기장 : 미정</Typography>}
          {info.isBook === "1" && (
            <>
              <Typography variant="subtitle2">경기장 예약: 미정</Typography>
              <Select>경기장선택</Select>
            </>
          )} */}
          <Grid container justify="center" spacing={1}>
            {/* <Grid item>
              <FormControl className={classes.formControl} component="fieldset">
                <FormLabel component="legend">경기장 예약 유/무</FormLabel>
                <RadioGroup
                  value={selectIsBook}
                  onChange={handleIsBook}
                  aria-label="isBook"
                  name="isBook"
                >
                  <Grid container justify="center">
                    <Grid item>
                      <FormControlLabel
                        className={classes.radioButton}
                        control={<Radio value="1" />}
                        label="유"
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        className={classes.radioButton}
                        control={<Radio value="0" />}
                        label="무"
                        labelPlacement="end"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid> */}
            {selectIsBook === "1" && (
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
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">팀 선택</InputLabel>
                <Select
                  name="teamID"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectTeam}
                  onChange={(e) => {
                    setSelectTeam(e.target.value);
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              <Button variant="contained" color="github" onClick={onRegister}>
                등록
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

export default MatchRegisterDialog;
