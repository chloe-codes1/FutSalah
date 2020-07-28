/*eslint-disable*/
import React, { useReducer, useState, Component, useCallback } from "react";
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

import axios from "axios";

const useStyles = makeStyles(styles);

// 첫 로그인(회원가입)일때 -> 1.구글 또는 카카오로 전달받은 ID를 backend로 전달
// -> backend에서 전달받은 ID가 기존회원인지 판단하여 front로 전달(기존회원이 아닐때 user create) -> front는 기존회원이 아닐때 추가정보 dialog를 호출 ->
// -> 추가정보를 입력받아 backend에 전달 -> backend는 정보를 전달받아 user update
const initialState = {
  user: {
    socialID: "",
    name: "",
    email: "",
    age: "",
    position: "",
    height: "",
    weight: "",
    profileURL: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT_USER":
      return {
        ...state,
        user: {
          ...state.user,
          socialID: action.getId,
          name: action.getName,
          profileURL: action.getImageURL,
          email: action.getEmail,
        },
      };
    case "CHANGE_INPUT":
      return {
        ...state,
        user: {
          ...state.user,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {};
    default:
      return state;
  }
}

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [addInfoOpen, setAddInfoOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = state;
  const {
    socialID,
    name,
    email,
    age,
    position,
    height,
    weight,
    profileURL,
  } = state.user;

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

  const initUser = useCallback((getId, getEmail, getName, getImageURL) => {
    // console.log(getId);
    // console.log(getEmail);
    // console.log(getName);
    // console.log(getImageURL);
    dispatch({
      type: "INIT_USER",
      getId,
      getEmail,
      getName,
      getImageURL,
    });
  }, []);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const onRegister = useCallback(() => {
    axios({
      method: "post",
      url: "http://localhost:9999/api/user",
      data: user,
    })
      .then(() => {
        console.log("success");
        addInfoClose();
      })
      .catch(() => {
        console.log("fail");
        addInfoClose();
      });
  }, [user]);
  //console.log(user);
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
          initUser={initUser}
        />
        <AddInfoDialog
          open={addInfoOpen}
          onClose={addInfoClose}
          userInfo={user}
          onChange={onChange}
          onRegister={onRegister}
        />
      </ListItem>
    </List>
  );
}
