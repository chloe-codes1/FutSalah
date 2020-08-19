import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import nologo from "assets/img/nologo.png";
import styles from "assets/jss/material-kit-react/views/componentsSections/rankingStyle.js";
import top from "assets/img/up-arrow.png";
import trophy1 from "assets/img/ranking/trophy1.png";
import trophy2 from "assets/img/ranking/trophy2.png";
import trophy3 from "assets/img/ranking/trophy3.png";

const useStyles = makeStyles(styles);

const buttonStyle = makeStyles(() => ({
  top: {
    position: 'fixed',
    right: '2vw',
    bottom: '3vh',
    width: '30px'
  }
}));

export default function Ranking() {
  const classes = useStyles();
  const buttonClass = buttonStyle();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth); // 창 너비
  const [champions, setChampions] = useState([]); // 1,2,3위 팀 가져오기
  const scrollToTop = () =>{
    window.scrollTo(0, 0);
  }

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
        <span>Team Ranking</span>
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
                          width: "60px",
                          height: "60px",
                        }}
                      >
                        <img
                          src={trophy1}
                          alt="..."
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            right: "0",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
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
            {champions.length > 1 && (
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
                        width: "60px",
                        height: "60px",
                      }}
                    >
                      <img
                        src={trophy2}
                        alt="..."
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          right: "0",
                          bottom: "0",
                          width: "100%",
                          height: "100%",
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
                          width: "60px",
                          height: "60px",
                        }}
                      >
                        <img
                          src={trophy1}
                          alt="..."
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            right: "0",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
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
            {champions.length > 2 && (
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
                        width: "60px",
                        height: "60px",
                      }}
                    >
                      <img
                        src={trophy3}
                        alt="..."
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          right: "0",
                          bottom: "0",
                          width: "100%",
                          height: "100%",
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
      <Tooltip title="상단으로 이동" interactive>
      <Button className={buttonClass.top} onClick={scrollToTop}>
        <img src={top} width="100%"/>
      </Button>
      </Tooltip>
    </GridContainer>
  );
}
