import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "components/Footer/Footer.js";

// core components
import AdminHeader from "components/Header/AdminHeader.js";
import AdminHeaderLinks from "components/Header/AdminHeaderLinks.js";

// Dialogs
import Parallax from "components/Parallax/Parallax.js";
import AdminUserContext from "../../contexts/AdminUserContext";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/AdminPage.js";

export default function Admin(props) {
  const { ...rest } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const history = useHistory();

  const { adminuserinfo, adminUserDispatch } = useContext(AdminUserContext);
  console.log(adminuserinfo);

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
      ></Parallax>
      <Footer />
    </div>
  );
}
