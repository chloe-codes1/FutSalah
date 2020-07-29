// validation
import * as Yup from "yup";

import React, { useContext, useEffect, useState } from "react";

import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Datetime from "react-datetime";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import Parallax from "components/Parallax/Parallax.js";
import Tooltip from "@material-ui/core/Tooltip";
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
  const history = useHistory();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

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
      url: "http://localhost:9999/api/login",
      data: user,
    })
      .then((res) => {
        console.log("get user info succeed!");
        console.log("res??", res.data);
        const userUpdate = {
          ...user,
          userID: res.data.userID,
          name: res.data.name,
          email: res.data.email,
          position: res.data.position,
          age: res.data.age,
          weight: res.data.weight,
          height: res.data.height,
          profileURL: res.data.profileURL,
        };
        formik.setValues(userUpdate);
        setUser(userUpdate);
        setPos(res.data.position)
        setIsLoadded(true);
      })
      .catch((e) => {
        console.log("error e", e);
      });

  useEffect(() => {
    const socialID = userinfo.socialID;
    user.socialID = socialID;
    getUserInfo();
  }, []);

  if (isLoadded) {
    // console.log(
    //   "formik initialValues->",
    //   JSON.stringify(formik.initialValues, null, 2)
    // );
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
      userID: user.userID,
      email: formik.values.email,
      position: pos,
      age: Number(age._d?.getFullYear()),
      weight: formik.values.weight,
      height: formik.values.height,
      profileURL: formik.values.profileURL,
    };
    console.log("updatedUser", updatedUser);

    axios({
      method: "PUT",
      url: "http://localhost:9999/api/user",
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
          height: 200,
          color: "white",
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
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{user.name}</h3>
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
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}

                <GridContainer>
                  <GridItem>
                    <h3 className={classes.buttonTitle}>출생연도</h3>
                  </GridItem>

                  <GridItem>
                    <Datetime
                      dateFormat="YYYY"
                      timeFormat={false}
                      value={age ? age : formik.values.age}
                      onChange={(value) => setAge(value)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem className={classes.marginBottom}>
                    <h3 className={classes.buttonTitle }>포지션</h3>
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
                  <div className="invalid-feedback">
                    {formik.errors.position}
                  </div>
                )}
             
                <CustomInput
                  id="height"
                  labelText="키"
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
              {formik.touched.height && formik.errors.height && (
                <div className="invalid-feedback">{formik.errors.height}</div>
              )}
                <CustomInput
                  id="weight"
                  labelText="몸무게"
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
                  {formik.touched.weight && formik.errors.weight && (
                  <div className="invalid-feedback">{formik.errors.weight}</div>
                )}
                </GridItem>
              
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <Button onClick={onSubmit}>정보 변경</Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={8} className={classes.withdrawal}>
                <Link>탈퇴하기</Link>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
