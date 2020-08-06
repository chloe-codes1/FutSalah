import React, { useContext, useState } from "react";

import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// core components
import AdminHeader from "components/Header/AdminHeader.js";
import AdminHeaderLinks from "components/Header/AdminHeaderLinks.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// Dialogs
import Parallax from "components/Parallax/Parallax.js";
import UserContext from "../../contexts/UserContext";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/AdminPage.js";

const useStyles = makeStyles(styles);

export default function Admin(props) {
  const { userinfo, userDispatch } = useContext(UserContext);
  const classes = useStyles();
  const { ...rest } = props;

  const testInfo = {
    id: 1,
    location: "고양풋살센터",
    kickofftime: "2020-08-03 18:00",
    hometeam: "백석FC",
    awayteam: "팀동휘",
  };

  const testScore = {
    id: 1,
    hometeamscore: 1,
    awayteamscore: 2,
  };

  const testArriveTime = {
    id: 1,
    hometeamarrivetime: "2020-08-03 17:58",
    awayteamarrivetime: "2020-08-03 17:49",
  };

  const [matchInfo, setMatchInfo] = useState(testInfo);
  const [scoreInfo, setScoreInfo] = useState(testScore);
  const [arriveTimeInfo, setArriveTimeInfo] = useState(testArriveTime);

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
