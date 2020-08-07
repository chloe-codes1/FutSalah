import React from "react";
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  dateTime: {
    width: 240,
    margin: theme.spacing(1),
  },
  radioButton: {
    padding: "0 50px 0 50px",
  },
  searchButton: {
    width: 480,
    margin: "0 0 10px 0",
  },
}));

function MatchSearch() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <Grid container justify="center" spacing={1}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">시/도</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>서울특별시</MenuItem>
              <MenuItem value={20}>경기도</MenuItem>
              <MenuItem value={30}>제주도</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">구/군</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>일산동구</MenuItem>
              <MenuItem value={20}>처인구</MenuItem>
              <MenuItem value={30}>수지구</MenuItem>
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={0}>00:00</MenuItem>
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
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>5 : 5</MenuItem>
              <MenuItem value={20}>6 : 6</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">경기장 예약 유/무</FormLabel>
            <RadioGroup aria-label="stadium" name="stadium">
              <Grid container justify="center">
                <Grid item>
                  <FormControlLabel
                    className={classes.radioButton}
                    value="true"
                    control={<Radio />}
                    label="유"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="무"
                    labelPlacement="end"
                  />
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
          >
            <i className="fas fa-search" />
            매칭 검색
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default MatchSearch;
