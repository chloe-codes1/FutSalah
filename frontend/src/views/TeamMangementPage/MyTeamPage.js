import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

import classNames from "classnames";

// component
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Tooltip from "@material-ui/core/Tooltip";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import Icon from "@material-ui/core/Icon";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { IconButton, Button } from "@material-ui/core";

const useStyles = makeStyles(styles);

const cardStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function MyTeamPage(props) {
  const classes = useStyles();
  const classesCard = cardStyles();
  const { ...rest } = props;
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
      <Parallax small filter image={require("assets/img/myteambg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="left">
            <GridItem xs={12} sm={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Icon className="fa fa-plus-circle" />}
              >
                팀 생성
              </Button>
            </GridItem>
          </GridContainer>
          <GridContainer justify="left">
            <GridItem xs={12} sm={12} md={6}></GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
              <CustomInput
                id="email"
                labelText="이메일"
                formControlProps={{
                  fullWidth: true,
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyTeamPage;
