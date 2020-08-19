import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
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
import styles from "assets/jss/material-kit-react/views/componentsSections/rankingStyle.js";

const useStyles = makeStyles(styles);

export default function Ranking() {
  const classes = useStyles();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth); // 창 너비
  const [champions, setChampions] = useState([]); // 1,2,3위 팀 가져오기

  useEffect(() => {
    // ranking 데이터 가져오기
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

  // 현재 창 너비,  구하기
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <GridContainer className={classes.rankingContainer}>
      <GridItem className={classes.rankingTitle}>
        <div>Ranking</div>
      </GridItem>
      <GridItem className={classes.rankingCards}>
        <GridList
          spacing={20}
          cellHeight="auto"
          cols={innerWidth > 768 ? 3 : 1}
          style={{ margin: "0 auto", width: "80%" }}
        >
          {innerWidth <= 768 && (
            <GridListTile>
              {champions.length > 0 && (
                <Link
                  to={"/teaminfo/" + champions[0].teamID}
                  style={{ color: "black" }}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <Card>
                    <CardHeader
                      className={classes.cardHeader}
                      style={{ paddingBottom: 0 }}
                    >
                      <GridItem
                        style={{
                          position: "relative",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <img
                          src={one}
                          alt="..."
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
                          champions[0].profileURL
                            ? champions[0].profileURL
                            : nologo
                        }
                        alt="..."
                        style={{
                          zIndex: 0,
                          borderRadius: champions[0].profileURL && "70%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <img
                        src={trophy1}
                        alt="..."
                        style={{
                          width: "40%",
                          zIndex: 1,
                          marginTop: "-30%",
                          marginLeft: "70%",
                        }}
                      />
                      <h5>
                        <strong>{champions[0].name}</strong>
                      </h5>
                      <h5>{champions[0].points} points</h5>
                    </CardBody>
                  </Card>
                </Link>
              )}
            </GridListTile>
          )}
          <GridListTile>
            {champions.length > 0 && (
              <Link
                to={"/teaminfo/" + champions[1].teamID}
                style={{ color: "black" }}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Card
                  className={innerWidth > 768 ? classes.rankingCardDown : ""}
                >
                  <CardHeader
                    className={classes.cardHeader}
                    style={{ paddingBottom: 0 }}
                  >
                    <GridItem
                      style={{
                        position: "relative",
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <img
                        src={two}
                        alt="..."
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
                        champions[1].profileURL
                          ? champions[1].profileURL
                          : nologo
                      }
                      alt="..."
                      style={{
                        zIndex: 0,
                        borderRadius: champions[1].profileURL && "70%",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <img
                      src={trophy2}
                      alt="..."
                      style={{
                        width: "40%",
                        zIndex: 1,
                        marginTop: "-30%",
                        marginLeft: "70%",
                      }}
                    />
                    <h5>
                      <strong>{champions[1].name}</strong>
                    </h5>
                    <h5>{champions[1].points} points</h5>
                  </CardBody>
                </Card>
              </Link>
            )}
          </GridListTile>
          {innerWidth > 768 && (
            <GridListTile>
              {champions.length > 0 && (
                <Link
                  to={"/teaminfo/" + champions[0].teamID}
                  style={{ color: "black" }}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <Card>
                    <CardHeader
                      className={classes.cardHeader}
                      style={{ paddingBottom: 0 }}
                    >
                      <GridItem
                        style={{
                          position: "relative",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <img
                          src={one}
                          alt="..."
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
                          champions[0].profileURL
                            ? champions[0].profileURL
                            : nologo
                        }
                        alt="..."
                        style={{
                          zIndex: 0,
                          borderRadius: champions[0].profileURL && "70%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <img
                        src={trophy1}
                        alt="..."
                        style={{
                          width: "40%",
                          zIndex: 1,
                          marginTop: "-30%",
                          marginLeft: "70%",
                        }}
                      />
                      <h5>
                        <strong>{champions[0].name}</strong>
                      </h5>
                      <h5>{champions[0].points} points</h5>
                    </CardBody>
                  </Card>
                </Link>
              )}
            </GridListTile>
          )}
          <GridListTile>
            {champions.length > 0 && (
              <Link
                to={"/teaminfo/" + champions[2].teamID}
                style={{ color: "black" }}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Card
                  className={innerWidth > 768 ? classes.rankingCardDown : ""}
                >
                  <CardHeader
                    className={classes.cardHeader}
                    style={{ paddingBottom: 0 }}
                  >
                    <GridItem
                      style={{
                        position: "relative",
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <img
                        src={three}
                        alt="..."
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
                        champions[2].profileURL
                          ? champions[2].profileURL
                          : nologo
                      }
                      alt="..."
                      style={{
                        zIndex: 0,
                        borderRadius: champions[2].profileURL && "70%",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <img
                      src={trophy3}
                      alt="..."
                      style={{
                        width: "40%",
                        zIndex: 1,
                        marginTop: "-30%",
                        marginLeft: "70%",
                      }}
                    />
                    <h5>
                      <strong>{champions[2].name}</strong>
                    </h5>
                    <h5>{champions[2].points} points</h5>
                  </CardBody>
                </Card>
              </Link>
            )}
          </GridListTile>
        </GridList>
      </GridItem>
    </GridContainer>
  );
}
