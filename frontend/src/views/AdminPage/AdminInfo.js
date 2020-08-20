import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// core components
import AdminHeader from "components/Header/AdminHeader.js";
import AdminHeaderLinks from "components/Header/AdminHeaderLinks.js";

// Dialogs
import Parallax from "components/Parallax/Parallax.js";
import AdminUserContext from "../../contexts/AdminUserContext";

// @material-ui/core components
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/AdminInfoPage.js";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

const StyledTableCell = withStyles((Theme) =>
  createStyles({
    head: {
      backgroundColor: Theme.palette.common.black,
      color: Theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: Theme.palette.action.hover,
      },
    },
  })
)(TableRow);

export default function AdminInfo(props) {
  const { adminuserinfo, adminUserDispatch } = useContext(AdminUserContext);
  const classes = useStyles();

  const { ...rest } = props;

  const [adminuser, setAdminUser] = useState({
    adminID: 0,
    name: "",
    stadiumID: 0,
  });

  const testMatchInfo = [
    {
      matchID: 1,
      time: 18,
      homeTeamID: 20,
      homeName: "백석FC",
      awayTeamID: 22,
      awayName: "팀동휘",
    },
  ];
  const [matchInfo, setMatchInfo] = useState(testMatchInfo);

  // 현재 날짜 정보 (년, 월, 일, 요일)
  const dateInfo = new Date();
  const year = dateInfo.getFullYear();
  const month = dateInfo.getMonth();
  const date = dateInfo.getDate();

  const loadMatchInfo = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/fsearch/${adminuser.stadiumID}`,
    })
      .then((res) => {
        console.log(res.data);
        setMatchInfo(res.data);
        console.log(matchInfo);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    const stadiumID = window.sessionStorage.getItem("stadiumID");
    adminuser.stadiumID = stadiumID;
    loadMatchInfo();
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
          <GridContainer spacing={3}>
            <GridItem xs={12}>
              <GridItem xs={12}>
                <h1>경기 목록</h1>
              </GridItem>
              <GridItem xs={6} className={classes.adminInfo}>
                <h3 style={{ textAlign: "right", paddingRight: "20px" }}>
                  {adminuserinfo.name}
                </h3>
              </GridItem>
              <GridItem xs={6} className={classes.adminInfo}>
                <h3 style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {year}-{month + 1}-{date}
                </h3>
              </GridItem>
            </GridItem>
          </GridContainer>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>순번</StyledTableCell>
                  <StyledTableCell>경기시간</StyledTableCell>
                  <StyledTableCell>홈팀</StyledTableCell>
                  <StyledTableCell>원정팀</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matchInfo.map((m, index) =>
                  m.matchID === undefined ? (
                    <StyledTableRow key={testMatchInfo.matchID}>
                      <StyledTableCell component="th" scope="row">
                        {testMatchInfo.matchID}
                      </StyledTableCell>
                      <StyledTableCell>
                        {testMatchInfo.time}:00 - {testMatchInfo.time + 2}:00
                      </StyledTableCell>
                      <StyledTableCell>
                        {testMatchInfo.homeName}
                      </StyledTableCell>
                      <StyledTableCell>
                        {testMatchInfo.awayName}
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link to={`/Admin/1/match/${index + 1}`}>
                          {m.time}:00 - {m.time + 2}:00
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>{m.homeName}</StyledTableCell>
                      <StyledTableCell>{m.awayName}</StyledTableCell>
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
