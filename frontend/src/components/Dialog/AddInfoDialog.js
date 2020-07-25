import React from "react";

import { Dialog, DialogTitle, TextField } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Button from "@material-ui/core/Button";

function AddInfoDialog(props) {
  const { open, onClose } = props;
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
            defaultValue="홍길동"
          />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="이메일" />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="나이" />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="선호포지션" />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="키" />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="몸무게" />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleClose}
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
