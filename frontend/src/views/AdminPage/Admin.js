import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "components/Footer/Footer.js";

// header components
import AdminHeader from "components/Header/AdminHeader.js";
import AdminHeaderLinks from "components/Header/AdminHeaderLinks.js";

// Dialogs
import Parallax from "components/Parallax/Parallax.js";
import AdminUserContext from "../../contexts/AdminUserContext";
// style components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/AdminPage.js";

export default function Admin(props) {
  const { ...rest } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const history = useHistory();

  const { adminuserinfo, adminUserDispatch } = useContext(AdminUserContext);

  const redirectToMatchList = () => {
    if (adminuserinfo.logged) {
      history.push(`/Admin/${adminuserinfo.stadiumID}`);
    }
  };

  useEffect(() => {
    redirectToMatchList();
  }, []);

  return (
    <div>
      <AdminHeader
        brand="FutSalah"
        color="transparent"
        rightLinks={<AdminHeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        filter
        image={require("assets/img/liveMatchbg.png")}
        style={{ alignItems: "stretch" }}
      >
        <div className={classes.container}>
          <h1>구장 관리 페이지</h1>
          <br></br>
          <p>구장 ID로 로그인하면 오늘 예정된 매치 목록을 볼 수 있습니다.</p>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
