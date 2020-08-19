import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";

import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import KakaoLogin from "react-kakao-login";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import axios from "axios";
import kakaobtn from "../../assets/img/button/kakao_login.png";
import styled from "styled-components";

const StyledKakaoLogin = styled(KakaoLogin)`
  display: inline-block;
  padding: 0;
  width: 183px;
  height: 45px;
  line-height: 45px;
  color: #3c1e1e;
  background-image: url(${kakaobtn});
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 2px 0.5px #c4c4c4;
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  padding: 0;
  width: 183px;
  height: 45px;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: 0px 2px 0.5px #c4c4c4;
`;

function LoginDialog(props) {
  const { open, onClose, addInfo, initUser, loggedUser } = props;

  const handleClose = () => {
    onClose();
  };

  const responseGoogle = (res) => {
    initUser(
      res.profileObj.googleId,
      res.profileObj.email,
      res.profileObj.name,
      res.profileObj.imageUrl
    );
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/login`,
      data: {
        socialID: res.profileObj.googleId,
      },
    })
      .then((e) => {
        if (e.data.socialID === res.profileObj.googleId) {
          console.log("already registered!!");
          // context 값 변경
          loggedUser(
            res.profileObj.googleId,
            e.data.userID,
            res.profileObj.name,
            "google",
            e.data.profileURL
          );
          onClose();
        } else {
          console.log("not registered");
          onClose();
          addInfo();
        }
      })
      .catch(() => {
        console.log("ERROR");
        onClose();
      });
  };

  // 카카오 로그인
  const responseKaKao = (res) => {
    initUser(res.profile.id, "", res.profile.properties.nickname, "");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/login`,
      data: {
        socialID: res.profile.id,
      },
    }).then((e) => {
      if (e.data.socialID === String(res.profile.id)) {
        console.log("already registered!!");
        // context 값 변경
        loggedUser(
          res.profile.id,
          e.data.userID,
          res.profile.properties.nickname,
          "kakao",
          e.data.profileURL
        );
        onClose();
      } else {
        console.log("not registered");
        onClose();
        addInfo();
      }
    });
  };

  const responseFail = (res) => {};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>로그인</DialogTitle>
      <DialogContent>
        <DialogContentText>SNS 로그인으로 간편하고 쉽게</DialogContentText>
        <List>
          <ListItem>
            <StyledGoogleLogin
              clientId="1034731139485-01ur10u2o05evfrb3gv2k4k1fs0uckff.apps.googleusercontent.com"
              buttonText="Google 로그인"
              onSuccess={responseGoogle}
              onFailure={responseFail}
              cookiePolicy={"single_host_origin"}
            />
          </ListItem>
          <ListItem>
            <StyledKakaoLogin
              jsKey="f0d70969d44c28662ff518abf4846ea6"
              buttonText=""
              onSuccess={responseKaKao}
              onFailure={responseFail}
              getProfile={true} // 카카오계정 프로필정보를 가져옴
            />
          </ListItem>
          <ListItem>
            <Link to={"/Admin"}>관리자 페이지</Link>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
