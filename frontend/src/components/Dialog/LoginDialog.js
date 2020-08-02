import { Dialog, DialogTitle } from "@material-ui/core";

import { GoogleLogin } from "react-google-login";
import KakaoLogin from "react-kakao-login";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import axios from "axios";

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
          loggedUser(res.profileObj.googleId, res.profileObj.name, "google");
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
    // console.log(res);
    // console.log(res.profile);
    // console.log(res.profile.id);
    // console.log(res.profile.properties.nickname);
    initUser(res.profile.id, "", res.profile.properties.nickname, "");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/login`,
      data: {
        socialID: res.profile.id,
      },
    }).then((e) => {
      console.log(e.data);
      if (e.data.socialID === String(res.profile.id)) {
        console.log("already registered!!");
        // context 값 변경
        loggedUser(res.profile.id, res.profile.properties.nickname, "kakao");
        onClose();
      } else {
        console.log("not registered");
        onClose();
        addInfo();
      }
    });
  };

  const responseFail = (res) => {
    console.log(res);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>로그인</DialogTitle>
      <List>
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
}

export default LoginDialog;
