import React from "react";

import { Dialog, DialogTitle, TextField } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Button from "@material-ui/core/Button";

function AddInfoDialog(props) {
  const { open, onClose, userInfo, onChange, onRegister } = props;
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>추가정보 입력</DialogTitle>
      <List>
        <ListItem>
          <TextField
            disabled
            variant="outlined"
            label="이름"
            value={userInfo.name}
          />
        </ListItem>
        <ListItem>
          <TextField
            name="eamil"
            variant="outlined"
            label="이메일"
            value={userInfo.email}
            onChange={onChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            name="age"
            onChange={onChange}
            variant="outlined"
            label="나이"
            value={userInfo.age}
          />
        </ListItem>
        <ListItem>
          <TextField
            name="position"
            onChange={onChange}
            variant="outlined"
            label="선호포지션"
            value={userInfo.position}
          />
        </ListItem>
        <ListItem>
          <TextField
            name="height"
            onChange={onChange}
            variant="outlined"
            label="키"
            value={userInfo.height}
          />
        </ListItem>
        <ListItem>
          <TextField
            name="weight"
            onChange={onChange}
            variant="outlined"
            label="몸무게"
            value={userInfo.weight}
          />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={onRegister}
          >
            저장
          </Button>
          <Button color="primary" onClick={handleClose}>
            건너뛰기
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default AddInfoDialog;
