import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import axios from "axios";

function ModifyTeamInfoDialog(props) {
  const { open, onClose, teamInfo, modifyTeamInfo } = props;

  const [sidoList, setSidoList] = useState(null);
  const [guList, setGuList] = useState(null);
  const [inputTeamInfo, setInputTeamInfo] = useState(teamInfo);

  useEffect(() => {
    // 지역 목록 불러오기
    //   axios({
    //     method: "get",
    //     url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/location`,
    //   })
    //     .then((res) => {
    //     })
    //     .catch((e) => {
    //       console.log("error", e);
    //     });
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
          <ListItem></ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            modifyTeamInfo(inputTeamInfo);
            handleClose();
          }}
        >
          변경
        </Button>
        <Button color="primary" onClick={handleClose}>
          나가기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModifyTeamInfoDialog;
