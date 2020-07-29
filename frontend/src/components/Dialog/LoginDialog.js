import React from "react";

import { Dialog, DialogTitle, Divider, TextField } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Button from "@material-ui/core/Button";

import { GoogleLogin } from "react-google-login";
import KakaoLogin from "react-kakao-login";

function LoginDialog(props) {
  const { open, onClose, addInfo, initUser } = props;

  const handleClose = () => {
    onClose();
  };

  // 추가작업 예정 : 처음 로그인시 AddInfoDialog를 생성 기존회원일 경우 생성하지 않고 로그인 완료. 현재는 구분x
  // 구글 로그인
  const responseGoogle = (res) => {
    // console.log(res);
    // console.log(res.profileObj);
    initUser(
      res.profileObj.googleId,
      res.profileObj.email,
      res.profileObj.name,
      res.profileObj.imageUrl
    );
    onClose();
    addInfo();
  };

  // 카카오 로그인
  const responseKaKao = (res) => {
    // console.log(res);
    // console.log(res.profile);
    // console.log(res.profile.id);
    // console.log(res.profile.properties.nickname);
    onClose();
    addInfo();
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
          <Button variant="contained" color="primary">
            로그인
          </Button>
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
}

export default LoginDialog;
