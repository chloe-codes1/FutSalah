import React from "react";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import GridList from "@material-ui/core/GridList";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import one from "assets/img/ranking/one.png";
import two from "assets/img/ranking/two.png";
import three from "assets/img/ranking/three.png";
import trophy1 from "assets/img/ranking/trophy1.png";
import trophy2 from "assets/img/ranking/trophy2.png";
import trophy3 from "assets/img/ranking/trophy3.png";
import tempImg from "assets/img/match-team1.png";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/loadingStyle.js";

const useStyles = makeStyles(styles);

export default function Ranking() {
  const classes = useStyles();
  return (
    <GridContainer
      style={{
        width: "100%",
        margin: "0 auto",
        padding: "auto",
        paddingTop: "50px",
        paddingLeft: "15px",
      }}
    >
      <GridItem
        style={{
          width: "100%",
          marginBottom: 0,
          padding: "auto",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            fontWeight: "600",
          }}
        >
          Ranking
        </div>
      </GridItem>
      <GridItem style={{ padding: "0 auto", width: "100%" }}>
        <GridList
          spacing={15}
          cellHeight="auto"
          cols={3}
          style={{ margin: "0 auto", width: "80%" }}
        >
          <GridContainer
            justify="center"
            style={{ margin: "0 auto", paddingTop: "100px" }}
          >
            <GridItem>
              <Card>
                <CardHeader
                  className={classes.cardHeader}
                  style={{ paddingBottom: 0 }}
                >
                  <GridItem
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <img
                      src={two}
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                      }}
                    />
                  </GridItem>
                </CardHeader>
                <CardBody className={classes.cardBody}>
                  <img
                    src={tempImg}
                    alt="..."
                    style={{
                      zIndex: 0,
                      borderRadius: "70%",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <img
                    src={trophy2}
                    style={{
                      width: "40%",
                      zIndex: 1,
                      marginTop: "-30%",
                      marginLeft: "70%",
                    }}
                  />
                  <h5>
                    <strong>팀이름</strong>
                  </h5>
                  <h5>200 points</h5>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center" style={{ margin: "0 auto" }}>
            <GridItem>
              <Card>
                <CardHeader
                  className={classes.cardHeader}
                  style={{ paddingBottom: 0 }}
                >
                  <GridItem
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <img
                      src={one}
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                      }}
                    />
                  </GridItem>
                </CardHeader>
                <CardBody className={classes.cardBody}>
                  <img
                    src={tempImg}
                    alt="..."
                    style={{
                      zIndex: 0,
                      borderRadius: "70%",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <img
                    src={trophy1}
                    style={{
                      width: "40%",
                      zIndex: 1,
                      marginTop: "-30%",
                      marginLeft: "70%",
                    }}
                  />
                  <h5>
                    <strong>팀이름</strong>
                  </h5>
                  <h5>200 points</h5>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer
            justify="center"
            style={{ margin: "0 auto", paddingTop: "100px" }}
          >
            <GridItem>
              <Card>
                <CardHeader
                  className={classes.cardHeader}
                  style={{ paddingBottom: 0 }}
                >
                  <GridItem
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <img
                      src={three}
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                      }}
                    />
                  </GridItem>
                </CardHeader>
                <CardBody className={classes.cardBody}>
                  <img
                    src={tempImg}
                    alt="..."
                    style={{
                      zIndex: 0,
                      borderRadius: "70%",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <img
                    src={trophy3}
                    style={{
                      width: "40%",
                      zIndex: 1,
                      marginTop: "-30%",
                      marginLeft: "70%",
                    }}
                  />
                  <h5>
                    <strong>팀이름</strong>
                  </h5>
                  <h5>200 points</h5>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </GridList>
      </GridItem>
    </GridContainer>
  );
}
