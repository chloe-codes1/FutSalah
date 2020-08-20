// validation
import * as Yup from "yup";

import { Grid, Modal, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Datetime from "react-datetime";
// react components for routing our app without refresh
import Dropzone from "../Dropzone/Dropzone";
import Fade from "@material-ui/core/Fade";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Typography from "@material-ui/core/Typography";
// context to use logged in user info
import UserContext from "../../contexts/UserContext";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// 사용자의 프로필 사진이 없을 때 대신 사진
import profile from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

const modalStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
}));

const validationStyle = makeStyles(() => ({
  message: {
    color: "#f03e3e",
    fontSize: "0.8rem",
  },
}));

const useStyles = makeStyles(styles);

const initialValues = {
  userID: 0,
  socialID: "",
  name: "",
  email: "",
  age: 0,
  position: "",
  height: null,
  weight: null,
  profileURL: "",
};

export default function ProfilePage(props) {
  const classes = useStyles();
  const modal = modalStyles();
  const history = useHistory();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const validationClass = validationStyle();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    alert("더 노력하는 FutSalah가 되겠습니다!");
  };

  const handleDropZone = () => {
    setDropZone(true);
  };
  const handleDropZoneClose = () => {
    setDropZone(false);
  };

  const [user, setUser] = useState({
    userID: 0,
    socialID: "",
    name: "",
    email: "",
    age: 0,
    position: "",
    height: null,
    weight: null,
    profileURL: "",
  });
  const [isLoadded, setIsLoadded] = useState(false);
  const [pos, setPos] = useState("");
  const [age, setAge] = useState(0);
  const [open, setOpen] = useState(false);
  const [dropZone, setDropZone] = useState(false);
  const { userinfo, userDispatch } = useContext(UserContext);
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("이메일을 입력해주세요.")
        .email("올바른 이메일 형식이 아닙니다"),
      weight: Yup.number()
        .moreThan(1, "입력하신 몸무게를 다시 확인해주세요.")
        .lessThan(200, "입력하신 몸무게를 다시 확인해주세요.")
        .positive()
        .nullable(true)
        .notRequired(),
      height: Yup.number()
        .moreThan(100, "입력하신 키를 다시 확인해주세요.")
        .lessThan(300, "입력하신 키를 다시 확인해주세요.")
        .positive()
        .nullable(true)
        .notRequired(),
      profileURL: Yup.string().url().notRequired(),
    }),
    onSubmit: () => {},
  });

  const getUserInfo = async () =>
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/login`,
      data: user,
    })
      .then((res) => {
        console.log("get user info succeed!");
        console.log("res??", res.data);
        let profileURL = res.data.profileURL;
        if (profileURL) {
          if (profileURL.slice(0, 10) == "https://lh") {
            console.log("google profile image 있는 유저");
          } else {
            profileURL = process.env.REACT_APP_S3_BASE_URL + "/" + profileURL;
          }
        } else {
          profileURL = profile;
        }

        const userUpdate = {
          ...user,
          userID: res.data.userID,
          email: res.data.email,
          position: res.data.position,
          age: res.data.age,
          weight: res.data.weight,
          height: res.data.height,
          profileURL: profileURL,
        };
        formik.setValues(userUpdate);
        setUser(userUpdate);
        setPos(res.data.position);
        // setAge(res.data.age);
        setIsLoadded(true);
      })
      .catch((e) => {
        console.log("error e", e);
      });

  useEffect(() => {
    const socialID = window.sessionStorage.getItem("id");
    user.socialID = socialID;
    getUserInfo();
  }, []);

  if (isLoadded) {
    console.log(
      "formik initialValues->",
      JSON.stringify(formik.initialValues, null, 2)
    );
    console.log("formik values->", JSON.stringify(formik.values, null, 2));
    // console.log("user->", JSON.stringify(user, null, 2));
  }

  const onSubmit = () => {
    formik.submitForm();
    console.log("formik.values??", formik.values);
    if (!formik.isValid || !formik.values.email) {
      console.log("Caught in validation filter...");
      return;
    }
    const updatedUser = {
      name: userinfo.name,
      userID: user.userID,
      email: formik.values.email,
      position: pos,
      age: Number(age?._d?.getFullYear()),
      weight: formik.values.weight,
      height: formik.values.height,
    };
    console.log("updatedUser", updatedUser);

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/user`,
      data: updatedUser,
      headers: {},
      validateStatus: false,
    })
      .then(() => {
        console.log("update succeed");
        history.push("/");
        alert("회원 정보가 수정되었습니다! ^0^");
        formik.resetForm();
      })
      .catch((err) => console.error("Wasn't able to update property...", err));
  };

  const deleteUser = () => {
    let params = new FormData();
    params.append("userID", user.userID);
    console.log("params", params);
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/user`,
      data: params,
      validateStatus: false,
    })
      .then(() => {
        console.log("user delete succeed");
        userDispatch({
          type: "LOGOUT_USER",
        });
        history.push("/");
        alert("그동안 FutSalah를 이용해 주셔서 감사합니다.");
        formik.resetForm();
      })
      .catch((err) => console.error("Wasn't able to delete user...", err));
  };

  console.log("age..", age._d?.getFullYear());
  console.log("pos..", pos);

  return (
    <div>
      <Header
        brand="FutSalah"
        color="transparent"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "dark",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/bg1.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <Tooltip title="프로파일 사진 변경하기" interactive>
                    <img
                      src={formik.values.profileURL}
                      className={imageClasses}
                      onClick={handleDropZone}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{userinfo.name}</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" className="form-group">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <CustomInput
                  id="email"
                  labelText="이메일"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: formik.values.email,
                    onChange: formik.handleChange,
                  }}
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className={validationClass.message}>
                    {formik.errors.email}
                  </div>
                )}

                <GridContainer>
                  <GridItem>
                    <h3 className={classes.buttonTitle}>출생연도 </h3>
                  </GridItem>

                  <GridItem>
                    <span className={classes.buttonTitle}>
                      {" "}
                      {user.age > 0 ? "나이:" + user?.age + "세" : ""}
                    </span>
                    <Datetime
                      dateFormat="YYYY"
                      timeFormat={false}
                      onChange={(value) => setAge(value)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem className={classes.marginBottom}>
                    <h3 className={classes.buttonTitle}>포지션</h3>
                    {pos}
                  </GridItem>
                  <GridItem>
                    <Button
                      className={
                        pos === "all"
                          ? classes.selectButton
                          : classes.buttonList
                      }
                      color="danger"
                      onClick={() => setPos("all")}
                    >
                      ALL
                    </Button>
                    <Tooltip
                      id="tooltip-PIVO"
                      title="풋살 포지션에서 가장 전방에 서는 선수로 공격적인 역할을 한다. 플레이 성향에 따라 ‘클래식 피보’와 ‘가짜 피보’로 나누어진다. 클래식 피보는 피지컬이 좋고 공을 잘 소유하는 선수로 아라(ALA)와의 연계를 잘 한다. ‘가짜 피보’는 축구에서 펄스 나인(False 9)과 유사하다. 피보 포지션이지만 그 자리에 국한되지 않은 플레이를 한다."
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        className={
                          pos === "pivo"
                            ? classes.selectButton
                            : classes.buttonList
                        }
                        color="rose"
                        onClick={() => setPos("pivo")}
                      >
                        PIVO
                      </Button>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-ALA"
                      title="쉽게 말하면 축구의 윙어 역할이다. 양 사이드에 위치하며 상대 수비를 흔드는 역할, 공격과 수비를 연결하는 역할을 한다. 하지만 풋살에서는 수비 가담도 많이 해야 하기 때문에 활동량 많은 선수들에게 적합하다."
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        className={
                          pos === "ala"
                            ? classes.selectButton
                            : classes.buttonList
                        }
                        color="warning"
                        onClick={() => setPos("ala")}
                      >
                        ALA
                      </Button>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-FIXO"
                      title="필드 플레이어 중 가장 아래에 서는 선수를 픽소라고 한다. 픽소는 경기를 넓게 볼 줄 알아야 하고 볼 운반/배급을 잘해야 한다. 골대 앞에 위치하기 때문에 당연히 수비력이 좋아야 한다."
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        className={
                          pos === "fixo"
                            ? classes.selectButton
                            : classes.buttonList
                        }
                        color="success"
                        onClick={() => setPos("fixo")}
                      >
                        FIXO
                      </Button>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-GOLEIRO"
                      title="풋살에서 골대를 지키는 역할을 한다. 축구에서는 골키퍼라고 하지만 풋살에서는 골레이로라고 한다."
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        className={
                          pos === "goleiro"
                            ? classes.selectButton
                            : classes.buttonList
                        }
                        color="info"
                        onClick={() => setPos("goleiro")}
                      >
                        GOLEIRO
                      </Button>
                    </Tooltip>
                  </GridItem>
                </GridContainer>
                {formik.touched.position && formik.errors.position && (
                  <div className={validationClass.message}>
                    {formik.errors.position}
                  </div>
                )}
                <GridItem>
                  <h3 className={classes.buttonTitle}>키</h3>
                </GridItem>

                <GridItem>
                  <CustomInput
                    id="height"
                    // labelText="키"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: formik.values.height,
                      onChange: formik.handleChange,
                    }}
                    className={`form-control ${
                      formik.touched.height && formik.errors.height
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                </GridItem>
                {formik.touched.height && formik.errors.height && (
                  <div className={validationClass.message}>
                    {formik.errors.height}
                  </div>
                )}
                <GridItem>
                  <h3 className={classes.buttonTitle}>몸무게</h3>
                </GridItem>
                <GridItem>
                  <CustomInput
                    id="weight"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: formik.handleChange,
                      value: formik.values.weight,
                    }}
                    className={`form-control ${
                      formik.touched.weight && formik.errors.weight
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                </GridItem>
                {formik.touched.weight && formik.errors.weight && (
                  <div className={validationClass.message}>
                    {formik.errors.weight}
                  </div>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <Button onClick={onSubmit}>정보 변경</Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={8} className={classes.withdrawal}>
                <Button onClick={handleOpen} color="danger">
                  탈퇴하기
                </Button>
              </GridItem>
            </GridContainer>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={modal.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={modal.paper} align="center">
                  <Typography
                    variant="h5"
                    id="transition-modal-title"
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  >
                    정말 떠나실건가요? ㅠ_ㅠ
                  </Typography>
                  <Typography
                    id="transition-modal-description"
                    align="center"
                    style={{ fontSize: "0.8rem" }}
                  >
                    스마트한 풋살 경기를 위한 최고의 플랫폼이 될 수 있도록
                    <br />
                    저희 FutSalah는 지속적으로 노력중입니다. <br />
                    불편한점은 futsalah1@gmail.com으로 알려주시면 <br />
                    개선하고, 반영하겠습니다. <br />
                    <br />
                    FutSalah를 더 이상 사용하고 싶지 않다면, <br />
                    아래 '탈퇴하기'를 클릭해주세요. <br />
                    <br />
                  </Typography>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={deleteUser}
                  >
                    탈퇴하기
                  </Button>
                  <Button onClick={handleClose}>계속 사용할래요!</Button>
                </div>
              </Fade>
            </Modal>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={modal.modal}
              open={dropZone}
              onClose={handleDropZoneClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={dropZone}>
                <div className={modal.paper} align="center">
                  <Grid mt={5}>
                    <Dropzone align="center" ID={user.userID} path="user" />
                  </Grid>
                  <Typography
                    id="transition-modal-title"
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  >
                    당신을 나타내는 사진을 업로드 하세요!
                  </Typography>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
