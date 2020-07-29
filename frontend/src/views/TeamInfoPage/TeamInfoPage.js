import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// // react components for routing our app without refresh
// import { Link } from "react-router-dom";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Paginations from "components/Pagination/Pagination.js";

// 사용자의 프로필 사진 가져오기
import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/teamInfoPage.js";
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  // 테스트 데이터
  const testTeamList = [
    {
      name: "김싸피",
      position: "Pivo",
      age: 2000,
      height: 180,
      weight: 80,
    },
    {
      name: "이싸피",
      position: "ALL",
      age: 2004,
      height: 170,
      weight: 85,
    },
    {
      name: "김철수",
      position: "Ala",
      age: 2002,
      height: 150,
      weight: 83,
    },
    {
      name: "이영희",
      position: "Fixo",
      age: 2000,
      height: 190,
      weight: 90,
    },
    {
      name: "바둑이",
      position: "Goleiro",
      age: 2010,
      height: 110,
      weight: 30,
    },
  ];

  const testRecord = {
    win: 2,
    lose: 1,
    draw: 3,
  };

  const [subMenu, setSubMenu] = useState(0);
  const [teamList, setTeamList] = useState(testTeamList);
  const [record, setRecord] = useState(testRecord);

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
      <Parallax filter style={{ alignItems: "stretch" }}>
        <div className={classes.container}>
          <GridContainer spacing={3}>
            <GridItem xs={12}>
              <div style={{ display: "inline-block" }}>
                <Tooltip
                  id="tooltip-ALA"
                  title="여기에 팀정보 출력하기"
                  placement="bottom"
                  //   classes={{ tooltip: classes.tooltip }}
                >
                  <h1>팀이름</h1>
                </Tooltip>
              </div>
            </GridItem>
            <GridItem
              xs={12}
              sm={6}
              style={{
                textAlign: "center",
              }}
            >
              <Paginations pages={[{ text: 1 }, { text: 2 }, { text: 3 }]} />
              <div className={classes.formation}></div>
            </GridItem>
            <GridItem xs={12} sm={6}>
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
                    className={
                      subMenu === 0 ? classes.selected : classes.button
                    }
                    onClick={() => {
                      setSubMenu(0);
                    }}
                  >
                    팀원
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    className={
                      subMenu === 1 ? classes.selected : classes.button
                    }
                    onClick={() => {
                      setSubMenu(1);
                    }}
                  >
                    전적
                  </Button>
                </ListItem>
              </List>
              {/* 팀원 목록 */}
              <TableContainer
                className={subMenu === 0 ? classes.table : classes.hiddenTable}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>팀원이름</TableCell>
                      <TableCell>포지션</TableCell>
                      <TableCell>출생년도</TableCell>
                      <TableCell>키</TableCell>
                      <TableCell>몸무게</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teamList.map((teamList) => (
                      <TableRow key={teamList.name}>
                        <TableCell>{teamList.name}</TableCell>
                        <TableCell>{teamList.position}</TableCell>
                        <TableCell>{teamList.age}</TableCell>
                        <TableCell>{teamList.height}</TableCell>
                        <TableCell>{teamList.weight}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* 전적 정보 */}
              <div
                className={
                  subMenu === 1 ? classes.record : classes.hiddenRecord
                }
              >
                <h1>
                  {record.win}승 {record.lose}패 {record.draw}무
                </h1>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
