/*eslint-disable*/
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
  Dialog,
  DialogTitle,
  Divider,
  Input,
  TextField,
} from "@material-ui/core";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.js";
import LoginButton from "@material-ui/core/Button";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

// social login
import { GoogleLogin } from "react-google-login";
import KakaoLogin from "react-kakao-login";

const useStyles = makeStyles(styles);

// 첫 로그인(회원가입)일때 -> 1.구글 또는 카카오로 전달받은 ID를 backend로 전달
// -> backend에서 전달받은 ID가 기존회원인지 판단하여 front로 전달(기존회원이 아닐때 user create) -> front는 기존회원이 아닐때 추가정보 dialog를 호출 ->
// -> 추가정보를 입력받아 backend에 전달 -> backend는 정보를 전달받아 user update

// 처음 로그인시 - 추가정보 입력시킬 dialog
const AddInfoDialog = (props) => {
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
          <LoginButton
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleClose}
          >
            저장
          </LoginButton>
          <LoginButton color="primary" onClick={handleClose}>
            건너뛰기
          </LoginButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

// 로그인 dialog
const LoginDialog = (props) => {
  const { open, onClose, addInfo } = props;

  const handleClose = () => {
    onClose();
  };

  // 구글 로그인 일때 작업
  const responseGoogle = (res) => {
    console.log(res);
    console.log(res.profileObj);
    console.log(res.googleId);
    console.log(res.profileObj.name);
    onClose();
    addInfo();
  };

  // 카카오 로그인 일때 작업
  const responseKaKao = (res) => {
    console.log(res);
    console.log(res.profile);
    console.log(res.profile.id);
    console.log(res.profile.properties.nickname);
  };

  const responseFail = (res) => {
    console.log(res);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>로그인</DialogTitle>
      <List>
        <ListItem>
          <TextField label="ID" variant="outlined" />
        </ListItem>
        <ListItem>
          <TextField label="password" variant="outlined" type="password" />
        </ListItem>
        <ListItem>
          <LoginButton variant="contained" color="primary">
            로그인
          </LoginButton>
        </ListItem>
        <Divider />
        <ListItem>
          <GoogleLogin
            clientId="1034731139485-01ur10u2o05evfrb3gv2k4k1fs0uckff.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseFail}
            cookiePolicy={"single_host_origin"}
          />
        </ListItem>
        <ListItem>
          <KakaoLogin
            jsKey="f0d70969d44c28662ff518abf4846ea6"
            //buttonText="KaKao"
            onSuccess={responseKaKao}
            onFailure={responseFail}
            useDefaultStyle
            getProfile={true} // 카카오계정 프로필정보를 가져옴
          />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [signinOpen, setSigninOpen] = useState(false);
  const [addInfoOpen, setAddInfoOpen] = useState(false);
  const signinClickOpen = () => {
    setSigninOpen(true);
  };
  const signinClickClose = () => {
    setSigninOpen(false);
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
          onClick={(e) => e.preventDefault()}
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
      </ListItem>
    </List>
  );
}
