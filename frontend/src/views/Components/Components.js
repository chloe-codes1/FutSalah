import React, { useState, useEffect } from "react";
// react components for routing our app without refresh

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Ranking from "views/Components/Ranking/Ranking.js";

import bg from "assets/img/bg1.jpg";
import mainVideo from "assets/video/main.mp4";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [innerWidth, setInnerWidth] = useState(window.innerWidth); // 창 너비

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
      <GridContainer
        style={{
          margin: 0,
          padding: 0,
          minHeight: "700px",
          width: "100%",
        }}
      >
        <GridItem
          style={{
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          {innerWidth > 768 ? (
            <div>
              <video
                muted
                autoPlay
                loop
                style={{
                  position: "absolute",
                  padding: 0,
                  width: "100%",
                }}
              >
                <source src={mainVideo} type="video/mp4" />
                <strong>Your browser does not support the video tag.</strong>
              </video>
              <div className={classes.brand}>
                <h1 className={classes.title}>FutSalah</h1>
                <h3 className={classes.subtitle}>동네축구를 프로축구처럼</h3>
              </div>
            </div>
          ) : (
            <div
              style={{
                position: "flex",
                backgroundImage: "url(" + bg + ")",
                height: "1000px",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <div className={classes.brand} style={{ paddingTop: "250px" }}>
                <h1 className={classes.title}>FutSalah</h1>
                <h3 className={classes.subtitle}>동네축구지만 프로축구처럼</h3>
              </div>
            </div>
          )}
        </GridItem>
        <GridItem
          style={{
            width: "100%",
            margin: 0,
            paddingTop: innerWidth > 768 ? "32.25%" : 0,
          }}
        >
          <div
            style={{
              width: "100%",
              overflow: "auto",
            }}
          >
            <Ranking />
          </div>
        </GridItem>
        <GridItem style={{ padding: 0 }}>
          <GridContainer
            style={{ paddingLeft: "5%", backgroundColor: "#2b2d42" }}
          >
            <GridItem
              xs={12}
              style={{
                color: "white",
                paddingTop: "40px",
                paddingBottom: "30px",
              }}
            >
              <h1>
                <strong>Guide</strong>
              </h1>
            </GridItem>
            <GridItem md={12} lg={6}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/xomJZ-enlwo"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </GridItem>
            <GridItem md={12} lg={6} style={{ color: "white" }}>
              <h3>Tutorial 1.</h3>
              <p>팀 생성하기 / 팀 관리하기</p>
            </GridItem>
            <GridItem md={12} lg={6}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/MrvPqqfCXxI"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </GridItem>
            <GridItem md={12} lg={6} style={{ color: "white" }}>
              <h3>Tutorial 2.</h3>
              <p>팀 찾기 / 팀 가입하기</p>
            </GridItem>
            <GridItem md={12} lg={6}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/THS8NgvpXsw"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </GridItem>
            <GridItem md={12} lg={6} style={{ color: "white" }}>
              <h3>Tutorial 3.</h3>
              <p>경기 매칭하기</p>
            </GridItem>
            <GridItem md={12} lg={6}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/oYaxHDhrCus"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </GridItem>
            <GridItem md={12} lg={6} style={{ color: "white" }}>
              <h3>Tutorial 4.</h3>
              <p>구장 이용 하기</p>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <Footer />
    </div>
  );
}
