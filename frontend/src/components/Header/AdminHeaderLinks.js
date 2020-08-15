// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import { Avatar, ListItemText } from "@material-ui/core";
/*eslint-disable*/
import React, { useCallback, useContext, useReducer, useState } from "react";

import AddInfoDialog from "../Dialog/AddInfoDialog";
// core components
import Button from "components/CustomButtons/Button.js";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// dialog components
import AdminLoginDialog from "../Dialog/AdminLoginDialog";
import AdminUserContext from "../../contexts/AdminUserContext";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

// 첫 로그인(회원가입)일때 -> 1.구글 또는 카카오로 전달받은 ID를 backend로 전달
// -> backend에서 전달받은 ID가 기존회원인지 판단하여 front로 전달(기존회원이 아닐때 user create) -> front는 기존회원이 아닐때 추가정보 dialog를 호출 ->
// -> 추가정보를 입력받아 backend에 전달 -> backend는 정보를 전달받아 user update
const adminInitialState = {
  admin: {
    adminID: "",
    // Admin ID (Admin의 고유 ID : AutoIncrement)
    name: "",
    // 로그인 버튼 옆에 표시할 Admin name(= 구장명)
    stadiumID: "",
    // url에 표시할 구장 ID
    logged: false,
  },
};

function adminreducer(state, action) {
  switch (action.type) {
    case "INIT_ADMIN":
      return {
        ...state,
        admin: {
          ...state.admin,
          adminID: action.adminID,
          name: action.name,
          stadiumID: action.stadiumID,
        },
      };
    default:
      return state;
  }
}

export default function AdminHeaderLinks(props) {
  const { adminuserinfo, adminUserDispatch } = useContext(AdminUserContext);
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [state, dispatch] = useReducer(adminreducer, adminInitialState);
  console.log(adminuserinfo);

  const loginClickOpen = () => {
    setLoginOpen(true);
  };
  const loginClickClose = () => {
    setLoginOpen(false);
  };

  const initAdmin = useCallback((adminID, name, stadiumID) => {
    // console.log(adminID + " " + name);
    dispatch({
      type: "INIT_ADMIN",
      adminID,
      name,
      stadiumID,
    });
  }, []);

  const loggedUser = useCallback((adminID, name, stadiumID) => {
    window.sessionStorage.setItem("adminID", adminID);
    window.sessionStorage.setItem("name", name);
    window.sessionStorage.setItem("stadiumID", stadiumID);
    adminUserDispatch({
      type: "ADMIN_LOGIN_USER",
      adminID,
      name,
      stadiumID,
    });
  }, []);

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {adminuserinfo.logged && (
          <IconButton>
            <Avatar className={classes.small} />
          </IconButton>
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        {adminuserinfo.logged && (
          <ListItemText className={classes.listItemText}>
            {adminuserinfo.name}님 환영합니다!
          </ListItemText>
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        {!adminuserinfo.logged && (
          <Button
            href="#pablo"
            className={classes.ButtonNavLink}
            onClick={loginClickOpen}
            color="danger"
          >
            Login
          </Button>
        )}
        {/* {!userinfo.logged && (
          <Button
            href="#pablo"
            className={classes.ButtonNavLink}
            onClick={(e) => e.preventDefault()}
            color="info"
          >
            register
          </Button>
        )} */}
        {adminuserinfo.logged && (
          <Button
            href="#pablo"
            className={classes.ButtonNavLink}
            onClick={() =>
              adminUserDispatch({
                type: "ADMIN_LOGOUT_USER",
              })
            }
            color="warning"
          >
            <Link to={"/"} className={classes.link}>
              Logout
            </Link>
          </Button>
        )}
        <AdminLoginDialog
          open={loginOpen}
          onClose={loginClickClose}
          initAdmin={initAdmin}
          loggedUser={loggedUser}
        />
      </ListItem>
    </List>
  );
}
