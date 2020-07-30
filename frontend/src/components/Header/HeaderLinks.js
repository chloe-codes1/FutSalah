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
import LoginDialog from "../Dialog/LoginDialog";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

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
      console.log(action.name + " " + action.value);
      return {
        ...state,
        user: {
          ...state.user,
          [action.name]: action.value,
        },
      };
    case "CHANGE_AGE":
      return {
        ...state,
        user: {
          ...state.user,
          age: action.getAge,
        },
      };
    case "CREATE_USER":
      return {};
    default:
      return state;
  }
}

export default function HeaderLinks(props) {
  const { userinfo, userDispatch } = useContext(UserContext);
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [addInfoOpen, setAddInfoOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = state;

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
  const loggedUser = useCallback((id, name, provider) => {
    window.sessionStorage.setItem("id", id);
    window.sessionStorage.setItem("name", name);
    window.sessionStorage.setItem("provider", provider);
    userDispatch({
      type: "LOGIN_USER",
      id,
      name,
      provider,
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
        alert("정보 저장이 완료되었습니다!");
        loggedUser(user.socialID, user.name, "social");
        addInfoClose();
      })
      .catch((e) => {
        console.log("error", e);
        alert("잠시 후 다시 시도해주세요!");
        console.log("fail");
        addInfoClose();
      });
  }, [user]);

  const changeAge = useCallback((getAge) => {
    console.log(getAge);
    const name = "age";
    const value = String(getAge);
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to={"/teaminfo/1"} className={classes.link}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            팀정보(데모)
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to={"/searchteam"} className={classes.link}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            팀 찾기
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to={"/myteam"} className={classes.link}>
          {userinfo.logged && (
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              나의 팀
            </Button>
          )}
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to={"/profile"} className={classes.link}>
          {userinfo.logged && (
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              회원정보
            </Button>
          )}
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        {userinfo.logged && (
          <IconButton>
            <Avatar className={classes.small} />
          </IconButton>
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        {userinfo.logged && (
          <ListItemText className={classes.listItemText}>
            {userinfo.name}님 환영합니다!
          </ListItemText>
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        {!userinfo.logged && (
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
        {userinfo.logged && (
          <Button
            href="#pablo"
            className={classes.ButtonNavLink}
            onClick={() =>
              userDispatch({
                type: "LOGOUT_USER",
              })
            }
            color="warning"
          >
            Logout
          </Button>
        )}
        <LoginDialog
          open={loginOpen}
          onClose={loginClickClose}
          addInfo={addInfo}
          initUser={initUser}
          loggedUser={loggedUser}
        />
        <AddInfoDialog
          open={addInfoOpen}
          onClose={addInfoClose}
          userInfo={user}
          onChange={onChange}
          onRegister={onRegister}
          changeAge={changeAge}
        />
      </ListItem>
    </List>
  );
}
