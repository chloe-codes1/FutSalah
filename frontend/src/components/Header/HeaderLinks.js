// @material-ui/icons
import { Avatar } from "@material-ui/core";
/*eslint-disable*/
import React, { useCallback, useContext, useReducer, useState } from "react";

import AddInfoDialog from "../Dialog/AddInfoDialog";
// core components
import Button from "components/CustomButtons/Button.js";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// dialog components
import LoginDialog from "../Dialog/LoginDialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
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
  const loggedUser = useCallback((id, uid, name, provider, profileURL) => {
    window.sessionStorage.setItem("id", id);
    window.sessionStorage.setItem("uid", uid);
    window.sessionStorage.setItem("name", name);
    window.sessionStorage.setItem("provider", provider);
    window.sessionStorage.setItem("profileURL", profileURL);
    userDispatch({
      type: "LOGIN_USER",
      id,
      uid,
      name,
      provider,
      profileURL,
    });
  }, []);
  const onRegister = useCallback(
    (formik) => {
      const email = formik.values.email;
      const weight = formik.values.weight;
      const height = formik.values.height;
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/user`,
        data: {
          ...user,
          email: email,
          weight: weight,
          height: height,
        },
      })
        .then(() => {
          axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/login`,
            data: { socialID: user.socialID },
          }).then((e) => {
            console.log("데이터 불러오기 성공!");
            loggedUser(user.socialID, e.data.userID, user.name, "social", e.data.profileURL);
          });
          console.log("success");
          alert("정보 저장이 완료되었습니다!");
          addInfoClose();
        })
        .catch(() => {
          alert("잠시 후 다시 시도해주세요!");
          addInfoClose();
        });
    },
    [user]
  );

  const changeAge = useCallback((getAge) => {
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
        <Link to={"/searchteam"} className={classes.link}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            팀 찾기
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to={"/match"} className={classes.link}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            팀 매칭
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
              onClick={() => {
                window.scrollTo(0, 0);
              }}
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
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              회원정보
            </Button>
          )}
        </Link>
      </ListItem>
      {userinfo.logged && (
        <ListItem className={classes.listItem}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="center" className={classes.avatar} style={{}}>
                  <Avatar className={classes.small} src={userinfo.profileURL} />
                </TableCell>
                <TableCell
                  className={classes.user}
                  align="center"
                  style={{
                    margin: "0 auto",
                    padding: "0 auto",
                    borderStyle: "none",
                  }}
                >
                  {userinfo.name}님 환영합니다!
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ListItem>
      )}
      <ListItem className={classes.listItem}>
        {!userinfo.logged && (
          <Button
            style={{
              marginTop: "10px",
              height: "30px",
            }}
            href="#pablo"
            className={classes.ButtonNavLink}
            onClick={loginClickOpen}
            color="danger"
          >
            Login
          </Button>
        )}
        {userinfo.logged && (
          <Button
            style={{
              marginTop: "10px",
              height: "30px",
            }}
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
