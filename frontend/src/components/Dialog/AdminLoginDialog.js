import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  List,
  ListItem,
} from "@material-ui/core";

import React, { useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AdminLoginDialog(props) {
  const classes = useStyles();

  const { open, onClose, addInfo, initUser, loggedUser } = props;

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    onClose();
  };

  const responseAdmin = (res) => {
    console.log(adminId, password);
    initUser(adminId, "", "", "");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/login`,
      data: {
        ID: adminId, // socialID => ID
      },
    }).then((e) => {
      console.log(e.data);
      // context 값 변경
      loggedUser(
        res.profile.id, // 입력받은 Admin Id
        e.data.name, // db에 저장되어 있는 관리자 이름
        "admin", // 로그인 종류 (google, kakao, admin)
        e.data.profileURL // db에 저장되어 있는 프로필 사진
      );
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>로그인</DialogTitle>
      <List>
        <ListItem>
          <TextField
            variant="outlined"
            name="adminid"
            label="Admin Id"
            type="text"
            id="adminid"
            autoComplete="adminid"
            onChange={({ target: { value } }) => setAdminId(value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            variant="outlined"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </ListItem>
        <ListItem>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={responseAdmin}
          >
            Sign In
          </Button>
          {/* 로그인이 된 경우 AdminInfo/:id 로 보내기 */}
        </ListItem>
      </List>
    </Dialog>
  );
}

export default AdminLoginDialog;
