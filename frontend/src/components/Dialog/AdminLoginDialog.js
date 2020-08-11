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
import { useHistory } from "react-router-dom";

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

  const { open, onClose, initAdmin, loggedUser } = props;

  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleClose = () => {
    onClose();
  };

  const responseAdmin = () => {
    console.log(adminID);
    console.log(password);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/courtLogin`,
      data: {
        id: adminID,
        password: password,
      },
    }).then((e) => {
      console.log(e.data);
      initAdmin(
        e.data.adminID, // Admin ID (Admin의 고유 ID : AutoIncrement)
        e.data.name, // 로그인 버튼 옆에 표시할 Admin name(= 구장명)
        e.data.stadiumID // url에 표시할 구장 ID
      );
      loggedUser(
        e.data.adminID, // Admin ID (Admin의 고유 ID : AutoIncrement)
        e.data.name, // 로그인 버튼 옆에 표시할 Admin name(= 구장명)
        e.data.stadiumID // url에 표시할 구장 ID
      );
      history.push(`/Admin/${e.data.stadiumID}`);
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
            label="Admin ID"
            type="text"
            id="adminid"
            autoComplete="adminid"
            onChange={({ target: { value } }) => setAdminID(value)}
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
