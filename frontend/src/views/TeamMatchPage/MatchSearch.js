import React, { useState, useReducer, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "components/CustomButtons/Button.js";

import MatchRegisterDialog from "components/Dialog/MatchRegisterDialog.js";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  dateTime: {
    width: 300,
    margin: theme.spacing(1),
  },
  radioButton: {
    padding: "0 50px 0 50px",
  },
  searchButton: {
    width: 300,
    // margin: "0 0 10px 0",
    margin: theme.spacing(1),
  },
}));

const initialState = {
  search: {
    locationID: "",
    date: new Date(),
    time: "",
    type: "",
    isBook: "0",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return {
        ...state,
        search: {
          ...state.search,
          [action.name]: action.value,
        },
      };
    case "SIDO":
      return {};
    default:
      return state;
  }
};

function MatchSearch({ myteam, setMatchingList, setMyteam, userinfo }) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedGu, setSelectedGu] = useState([]);
  const [state, searchDispatch] = useReducer(reducer, initialState);
  const [register, setOpenRegister] = useState(false);
  const [area, setArea] = useState();
  const handleRegister = () => {
    if (userinfo.logged) {
      if (state.search.locationID === "") {
        alert("지역을 선택하세요.");
        return;
      }
      if (state.search.time === "") {
        alert("시간을 선택하세요.");
        return;
      }
      if (state.search.type === "") {
        alert("경기방식을 선택하세요.");
        return;
      }
      axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/location/` + state.search.locationID,
      }).then((e) => {
        setArea(e.data.sido + " " + e.data.gu);
      });
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/my`,
        data: { socialID: userinfo.socialID },
      }).then((e) => {
        setMyteam(e.data);
      });
      setOpenRegister(true);
    } else {
      alert("로그인 후 이용해주세요.");
    }
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const name = "date";
    const value = date;
    searchDispatch({
      type: "SELECT",
      name,
      value,
    });
  };
  const handleSidoChange = (event) => {
    setSelectedSido(event.target.value);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/location`,
      data: { sido: event.target.value },
    }).then((e) => {
      setSelectedGu([...e.data]);
    });
    const name = "locationID";
    const value = "";
    searchDispatch({
      type: "SELECT",
      name,
      value,
    });
  };
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    searchDispatch({
      type: "SELECT",
      name,
      value,
    });
  }, []);
  const handleSearch = useCallback(() => {
    let searchData = {
      date: "1900-01-01",
      formCode: 99,
      isBooked: 9,
      locationID: 999,
      time: 25,
    };
    if (state.search.date !== "") {
      searchData.date =
        state.search.date.getFullYear() +
        "-" +
        (state.search.date.getMonth() + 1) +
        "-" +
        state.search.date.getDate();
    }
    if (state.search.type !== "") {
      searchData.formCode = state.search.type;
    }
    if (state.search.isBook !== "") {
      searchData.isBooked = state.search.isBook;
    }
    if (state.search.locationID !== "") {
      searchData.locationID = state.search.locationID;
    }
    if (state.search.time !== "") {
      searchData.time = state.search.time;
    }
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match`,
      params: {
        date: searchData.date,
        formCode: searchData.formCode,
        isBooked: searchData.isBooked,
        locationID: searchData.locationID,
        time: searchData.time,
      },
    }).then((e) => {
      setMatchingList(e.data);
    });
  });

  return (
    <>
      <Grid container justify="center" spacing={1}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">시/도</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSido}
              onChange={handleSidoChange}
            >
              <MenuItem value="서울특별시">서울특별시</MenuItem>
              <MenuItem value="부산광역시">부산광역시</MenuItem>
              <MenuItem value="대구광역시">대구광역시</MenuItem>
              <MenuItem value="인천광역시">인천광역시</MenuItem>
              <MenuItem value="광주광역시">광주광역시</MenuItem>
              <MenuItem value="대전광역시">대전광역시</MenuItem>
              <MenuItem value="울산광역시">울산광역시</MenuItem>
              <MenuItem value="경기도">경기도</MenuItem>
              <MenuItem value="강원도">강원도</MenuItem>
              <MenuItem value="충청북도">충청북도</MenuItem>
              <MenuItem value="충청남도">충청남도</MenuItem>
              <MenuItem value="전라북도">전라북도</MenuItem>
              <MenuItem value="전라남도">전라남도</MenuItem>
              <MenuItem value="경상북도">경상북도</MenuItem>
              <MenuItem value="경상남도">경상남도</MenuItem>
              <MenuItem value="제주도">제주도</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">구/군</InputLabel>
            <Select
              value={state.search.locationID}
              name="locationID"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={onChange}
            >
              {selectedGu.length > 0 &&
                selectedGu.map((loc, index) => {
                  return (
                    <MenuItem key={index} value={loc.locationID}>
                      {loc.gu}
                    </MenuItem>
                  );
                })}
              {selectedGu.length === 0 && <MenuItem value="">시/도를 먼저 선택</MenuItem>}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <KeyboardDatePicker
              className={classes.dateTime}
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              label="경기일자"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">시간</InputLabel>
              <Select
                name="time"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.search.time}
                onChange={onChange}
              >
                <MenuItem value={24}>00:00</MenuItem>
                <MenuItem value={1}>01:00</MenuItem>
                <MenuItem value={2}>02:00</MenuItem>
                <MenuItem value={3}>03:00</MenuItem>
                <MenuItem value={4}>04:00</MenuItem>
                <MenuItem value={5}>05:00</MenuItem>
                <MenuItem value={6}>06:00</MenuItem>
                <MenuItem value={7}>07:00</MenuItem>
                <MenuItem value={8}>08:00</MenuItem>
                <MenuItem value={9}>09:00</MenuItem>
                <MenuItem value={10}>10:00</MenuItem>
                <MenuItem value={11}>11:00</MenuItem>
                <MenuItem value={12}>12:00</MenuItem>
                <MenuItem value={13}>13:00</MenuItem>
                <MenuItem value={14}>14:00</MenuItem>
                <MenuItem value={15}>15:00</MenuItem>
                <MenuItem value={16}>16:00</MenuItem>
                <MenuItem value={17}>17:00</MenuItem>
                <MenuItem value={18}>18:00</MenuItem>
                <MenuItem value={19}>19:00</MenuItem>
                <MenuItem value={20}>20:00</MenuItem>
                <MenuItem value={21}>21:00</MenuItem>
                <MenuItem value={22}>22:00</MenuItem>
                <MenuItem value={23}>23:00</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      <Grid container justify="center" spacing={1}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">경기방식</InputLabel>
            <Select
              name="type"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.search.type}
              onChange={onChange}
            >
              <MenuItem value={5}>5 : 5</MenuItem>
              <MenuItem value={6}>6 : 6</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">경기장 예약 유/무</FormLabel>
            <RadioGroup
              value={state.search.isBook}
              aria-label="isBook"
              name="isBook"
              onChange={onChange}
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
                  <FormControlLabel control={<Radio value="0" />} label="무" labelPlacement="end" />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Button
            className={classes.searchButton}
            variant="contained"
            color="info"
            onClick={handleSearch}
          >
            <i className="fas fa-search" />
            매칭 검색
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.searchButton}
            variant="contained"
            color="success"
            onClick={handleRegister}
          >
            <i className="fas fa-plus" />
            매칭 등록
          </Button>
        </Grid>
      </Grid>
      <MatchRegisterDialog
        open={register}
        onClose={handleCloseRegister}
        info={state.search}
        area={area}
        myteam={myteam}
        selectedDate={selectedDate}
      />
    </>
  );
}

export default MatchSearch;
