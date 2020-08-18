import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

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
import nologo from "assets/img/nologo.png";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/loadingStyle.js";

const useStyles = makeStyles(styles);

export default function Ranking() {
  const classes = useStyles();
  const [champions, setChampions] = useState([]);

  // 지역 목록 불러오기
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/rank`,
    })
      .then((res) => {
        setChampions(
          res.data.map((r) => {
            if (r.profileURL) {
              r.profileURL =
                process.env.REACT_APP_S3_BASE_URL + "/" + r.profileURL;
            }
            return r;
          })
        );
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

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
          paddingTop: "80px",
          paddingLeft: "50px",
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
                    src={
                      champions.length > 0 && champions[1].profileURL
                        ? champions[1].profileURL
                        : nologo
                    }
                    alt="..."
                    style={{
                      zIndex: 0,
                      borderRadius:
                        champions.length > 0 &&
                        champions[1].profileURL &&
                        "70%",
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
                  {champions.length > 0 && (
                    <Link
                      to={"/teaminfo/" + champions[1].teamID}
                      style={{ color: "black" }}
                    >
                      <h5>
                        <strong>{champions[1].name}</strong>
                      </h5>
                    </Link>
                  )}
                  <h5>{champions.length > 0 && champions[1].points} points</h5>
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
                    src={
                      champions.length > 0 && champions[0].profileURL
                        ? champions[0].profileURL
                        : nologo
                    }
                    alt="..."
                    style={{
                      zIndex: 0,
                      borderRadius:
                        champions.length > 0 &&
                        champions[0].profileURL &&
                        "70%",
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
                  {champions.length > 0 && (
                    <Link
                      to={"/teaminfo/" + champions[0].teamID}
                      style={{ color: "black" }}
                    >
                      <h5>
                        <strong>{champions[0].name}</strong>
                      </h5>
                    </Link>
                  )}
                  <h5>{champions.length > 0 && champions[0].points} points</h5>
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
                    src={
                      champions.length > 0 && champions[2].profileURL
                        ? champions[2].profileURL
                        : nologo
                    }
                    alt="..."
                    style={{
                      zIndex: 0,
                      borderRadius:
                        champions.length > 0 &&
                        champions[2].profileURL &&
                        "70%",
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
                  {champions.length > 0 && (
                    <Link
                      to={"/teaminfo/" + champions[2].teamID}
                      style={{ color: "black" }}
                    >
                      <h5>
                        <strong>{champions[2].name}</strong>
                      </h5>
                    </Link>
                  )}
                  <h5>{champions.length > 0 && champions[2].points} points</h5>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </GridList>
      </GridItem>
    </GridContainer>
  );
}
