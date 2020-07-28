import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Paginations from "components/Pagination/Pagination.js";

import styles from "assets/jss/material-kit-react/views/SearchTeamPage.js";
import bgImage from "assets/img/searchTeam-bg.jpg";
import avatarImage from "assets/img/faces/avatar.jpg";

const useStyles = makeStyles(styles);

export default function SearchTeamPage(props) {
  const classes = useStyles();
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

      <div
        className={classes.background}
        style={{
          backgroundImage: "url(" + bgImage + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridList spacing={15} cellHeight={"100%"} cols={3}>
            <GridContainer justify="center" style={{ margin: "0 auto" }}>
              <GridItem>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    <GridItem>
                      <img
                        src={avatarImage}
                        alt="..."
                        className={
                          classes.imgRaised +
                          " " +
                          classes.img +
                          " " +
                          classes.imgRoundedCircle +
                          " " +
                          classes.imgFluid
                        }
                      />
                    </GridItem>
                  </CardHeader>
                  <CardBody className={classes.cardBody}>
                    <h5>간단한 팀 소개</h5>
                    <h5>간단한 팀 소개</h5>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="success" size="lg">
                      팀 정보
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" style={{ margin: "0 auto" }}>
              <GridItem>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    <GridItem>
                      <img
                        src={avatarImage}
                        alt="..."
                        className={
                          classes.imgRaised +
                          " " +
                          classes.img +
                          " " +
                          classes.imgRoundedCircle +
                          " " +
                          classes.imgFluid
                        }
                      />
                    </GridItem>
                  </CardHeader>
                  <CardBody className={classes.cardBody}>
                    <h5>간단한 팀 소개</h5>
                    <h5>간단한 팀 소개</h5>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="success" size="lg">
                      팀 정보
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" style={{ margin: "0 auto" }}>
              <GridItem>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    <GridItem>
                      <img
                        src={avatarImage}
                        alt="..."
                        className={
                          classes.imgRaised +
                          " " +
                          classes.img +
                          " " +
                          classes.imgRoundedCircle +
                          " " +
                          classes.imgFluid
                        }
                      />
                    </GridItem>
                  </CardHeader>
                  <CardBody className={classes.cardBody}>
                    <h5>간단한 팀 소개</h5>
                    <h5>간단한 팀 소개</h5>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="success" size="lg">
                      팀 정보
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" style={{ margin: "0 auto" }}>
              <GridItem>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    <GridItem>
                      <img
                        src={avatarImage}
                        alt="..."
                        className={
                          classes.imgRaised +
                          " " +
                          classes.img +
                          " " +
                          classes.imgRoundedCircle +
                          " " +
                          classes.imgFluid
                        }
                      />
                    </GridItem>
                  </CardHeader>
                  <CardBody className={classes.cardBody}>
                    <h5>간단한 팀 소개</h5>
                    <h5>간단한 팀 소개</h5>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="success" size="lg">
                      팀 정보
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" style={{ margin: "0 auto" }}>
              <GridItem>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    <GridItem>
                      <img
                        src={avatarImage}
                        alt="..."
                        className={
                          classes.imgRaised +
                          " " +
                          classes.img +
                          " " +
                          classes.imgRoundedCircle +
                          " " +
                          classes.imgFluid
                        }
                      />
                    </GridItem>
                  </CardHeader>
                  <CardBody className={classes.cardBody}>
                    <h5>간단한 팀 소개</h5>
                    <h5>간단한 팀 소개</h5>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="success" size="lg">
                      팀 정보
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" style={{ margin: "0 auto" }}>
              <GridItem>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    <GridItem>
                      <img
                        src={avatarImage}
                        alt="..."
                        className={
                          classes.imgRaised +
                          " " +
                          classes.img +
                          " " +
                          classes.imgRoundedCircle +
                          " " +
                          classes.imgFluid
                        }
                      />
                    </GridItem>
                  </CardHeader>
                  <CardBody className={classes.cardBody}>
                    <h5>간단한 팀 소개</h5>
                    <h5>간단한 팀 소개</h5>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="success" size="lg">
                      팀 정보
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </GridList>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "2",
            position: "relative",
            margin: "30vh auto",
          }}
        >
          <Paginations
            pages={[
              { text: "<" },
              { text: 1 },
              { text: 2 },
              { text: 3 },
              { text: 4 },
              { text: 5 },
              { text: 6 },
              { text: 7 },
              { text: 8 },
              { text: 9 },
              { text: 10 },
              { text: ">" },
            ]}
            color="info"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
