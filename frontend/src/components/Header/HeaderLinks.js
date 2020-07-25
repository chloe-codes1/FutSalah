/*eslint-disable*/
import React, { useState, Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

// dialog components
import LoginDialog from "../Dialog/LoginDialog";
import AddInfoDialog from "../Dialog/AddInfoDialog";

const useStyles = makeStyles(styles);

// 첫 로그인(회원가입)일때 -> 1.구글 또는 카카오로 전달받은 ID를 backend로 전달
// -> backend에서 전달받은 ID가 기존회원인지 판단하여 front로 전달(기존회원이 아닐때 user create) -> front는 기존회원이 아닐때 추가정보 dialog를 호출 ->
// -> 추가정보를 입력받아 backend에 전달 -> backend는 정보를 전달받아 user update

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [addInfoOpen, setAddInfoOpen] = useState(false);

  const loginClickOpen = () => {
    setLoginOpen(true);
  };
  const loginClickClose = () => {
    setLoginOpen(false);
  };
  const addInfo = () => {
    setAddInfoOpen(true);
  };
  const addInfoClose = () => {
    setAddInfoOpen(false);
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button color="transparent" target="_blank" className={classes.navLink}>
          기능 1
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to={"/profile"} className={classes.link}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            회원정보
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={classes.ButtonNavLink}
          onClick={loginClickOpen}
          color="danger"
        >
          Login
        </Button>
        <Button
          href="#pablo"
          className={classes.ButtonNavLink}
          onClick={(e) => e.preventDefault()}
          color="info"
        >
          register
        </Button>
        <Button
          href="#pablo"
          className={classes.ButtonNavLink}
          onClick={(e) => e.preventDefault()}
          color="warning"
        >
          Logout
        </Button>
        <LoginDialog
          open={loginOpen}
          onClose={loginClickClose}
          addInfo={addInfo}
        />
        <AddInfoDialog open={addInfoOpen} onClose={addInfoClose} />
      </ListItem>
    </List>
  );
}
