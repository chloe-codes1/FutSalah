// @material-ui/core
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
/*eslint-disable*/
import React, { useCallback, useContext, useReducer, useState } from "react";

// core components
import Button from "components/CustomButtons/Button.js";

// dialog components
import AdminLoginDialog from "../Dialog/AdminLoginDialog";
// context components
import AdminUserContext from "../../contexts/AdminUserContext";
// style components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

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
            {adminuserinfo.name}
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
            Logout
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
