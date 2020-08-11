import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/AdminPage.js";

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

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

export default function AdminInfo(props) {
  const { adminuserinfo, adminUserDispatch } = useContext(AdminUserContext);
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

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
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/fsearch/1`,
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
              <h1>경기 목록</h1>

              <h3>고양풋살센터</h3>

              <h4>
                {year}-{month + 1}-{date}
              </h4>
            </GridItem>
          </GridContainer>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>No.</StyledTableCell>
                  <StyledTableCell>Kick-off time</StyledTableCell>
                  <StyledTableCell>Home</StyledTableCell>
                  <StyledTableCell>Away</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matchInfo.map((m, index) =>
                  m.matchID === undefined ? (
                    // 데이터를 못 받아올 경우
                    <StyledTableRow key={testMatchInfo.matchID}>
                      <StyledTableCell component="th" scope="row">
                        {testMatchInfo.matchID}
                      </StyledTableCell>
                      <StyledTableCell>{testMatchInfo.time}:00</StyledTableCell>
                      <StyledTableCell>
                        {testMatchInfo.homeName}
                      </StyledTableCell>
                      <StyledTableCell>
                        {testMatchInfo.awayName}
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    // 데이터를 받아온 경우
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link to={`/Admin/1/match/${index + 1}`}>
                          {m.time}:00
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
