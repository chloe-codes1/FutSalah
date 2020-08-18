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
    width: "100%",
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
      if (e.data) {
        initAdmin(e.data.adminID, e.data.name, e.data.stadiumID);
        loggedUser(e.data.adminID, e.data.name, e.data.stadiumID);
        history.push(`/Admin/${e.data.stadiumID}`);
        onClose();
      } else {
        alert("아이디 혹은 비밀번호가 틀립니다!");
        onClose();
      }
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
        </ListItem>
      </List>
    </Dialog>
  );
}

export default AdminLoginDialog;
