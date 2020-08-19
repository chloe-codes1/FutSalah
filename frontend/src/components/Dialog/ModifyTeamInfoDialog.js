import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import Button from "components/CustomButtons/Button.js";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ModifyTeamInfoDialog(props) {
  const { open, onClose, teamInfo, modifyTeamInfo } = props;
  const classes = useStyles();
  const [sido, setSido] = useState("");
  const [gu, setGu] = useState("");
  const [sidoList, setSidoList] = useState([]);
  const [guList, setGuList] = useState([]);
  const [inputTeamInfo, setInputTeamInfo] = useState(teamInfo);

  // inputTeamInfo에 locationID 넣기
  const setLocation = (guValue) => {
    setInputTeamInfo((prevState) => ({
      ...prevState,
      locationID: guList[guList.findIndex((g) => g.gu === guValue)].id,
      region: sido + " " + guValue,
    }));
  };

  const sidoChange = (event) => {
    // 시도 이름으로 구, locationID 불러오기
    setSido(event.target.value);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/location`,
      data: {
        sido: event.target.value,
      },
    })
      .then((res) => {
        const list = [];
        res.data.map((location) => {
          list.push({
            id: location.locationID,
            gu: location.gu,
          });
        });
        setGuList(list);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const guChange = (event) => {
    setGu(event.target.value);
    setLocation(event.target.value);
  };

  // 지역 목록 불러오기
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/location`,
    })
      .then((res) => {
        const list = [];
        res.data.map((location) => {
          if (list.find((sido) => sido === location.sido) === undefined)
            list.push(location.sido);
        });
        setSidoList(list);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  useEffect(() => {
    setInputTeamInfo(teamInfo);
  }, [teamInfo]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>팀 정보 변경</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <TextField
              label="팀 이름"
              value={inputTeamInfo.name}
              onChange={(e) => {
                setInputTeamInfo({
                  ...inputTeamInfo,
                  name: e.target.value,
                });
              }}
            />
          </ListItem>
          <ListItem>
            <TextareaAutosize
              label="팀 설명"
              rows={10}
              rowsMax={10}
              value={inputTeamInfo.description}
              onChange={(e) => {
                setInputTeamInfo({
                  ...inputTeamInfo,
                  description: e.target.value,
                });
              }}
              style={{ resize: "none" }}
            />
          </ListItem>
          <ListItem>
            <FormControl className={classes.formControl}>
              <InputLabel id="sido">시도</InputLabel>
              <Select
                labelId="sido"
                id="sido-select"
                value={sido}
                onChange={sidoChange}
              >
                {sidoList.map((s, idx) => (
                  <MenuItem key={idx} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="gu">시군구</InputLabel>
              <Select
                labelId="gu"
                id="gu-select"
                value={gu}
                onChange={guChange}
              >
                {guList.map((g) => (
                  <MenuItem value={g.gu}>{g.gu}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          color="teamInfo"
          onClick={() => {
            if (gu === "") alert("변경할 지역을 선택해주세요!");
            else {
              modifyTeamInfo(inputTeamInfo);
              setSido("");
              setGu("");
              handleClose();
            }
          }}
        >
          변경
        </Button>
        <Button color="teamInfo" onClick={handleClose}>
          나가기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModifyTeamInfoDialog;
