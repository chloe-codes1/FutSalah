import React, { useState, useEffect } from "react";

import { Dialog, DialogTitle, TextField } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

function AddInfoDialog(props) {
  const { open, onClose, teamInfo, modifyTeamInfo } = props;

  const [inputTeamInfo, setInputTeamInfo] = useState({});

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    console.log(teamInfo);
    setInputTeamInfo(teamInfo);
  }, [teamInfo]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
      <DialogTitle>팀 정보 변경</DialogTitle>
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
        <ListItem>팀 설명</ListItem>
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
            style={{ resize: "none", width: "100%" }}
          />
        </ListItem>

        <ListItem style={{ display: "flex", justifyContent: "flex-end" }}>
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
        </ListItem>
      </List>
    </Dialog>
  );
}

export default AddInfoDialog;
