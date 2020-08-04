import React, { useEffect, useState } from "react";

import AddUserDialog from "components/Dialog/AddUserDialog";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// Dialogs
import ModifyTeamInfoDialog from "components/Dialog/ModifyTeamInfoDialog";
import Paginations from "components/Pagination/Pagination.js";
import Parallax from "components/Parallax/Parallax.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/teamInfoPage.js";

// // react components for routing our app without refresh
// import { Link } from "react-router-dom";




const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  // 테스트 데이터
  // 팀원 목록
  const testTeamList = [
    {
      id: 1,
      name: "김싸피",
      position: "Pixo",
      age: 2000,
      height: 200,
      weight: 100,
    },
    {
      id: 2,
      name: "이철수",
      position: "Ala",
      age: 2001,
      height: 190,
      weight: 130,
    },
    {
      id: 3,
      name: "박영희",
      position: "ALL",
      age: 2002,
      height: 220,
      weight: 110,
    },
    {
      id: 4,
      name: "바둑이",
      position: "Golerio",
      age: 2020,
      height: 110,
      weight: 140,
    },
  ];

  // 팀 전적
  const testRecord = {
    win: 2,
    lose: 0,
    draw: 1,
    result: [
      {
        resultid: 1,
        homeScore: 2,
        awayScore: 1,
        homeTeamName: "Korea",
        awayTeamName: "Japan",
      },
      {
        resultid: 2,
        homeScore: 2,
        awayScore: 5,
        homeTeamName: "China",
        awayTeamName: "Korea",
      },
      {
        resultid: 3,
        homeScore: 1,
        awayScore: 1,
        homeTeamName: "Korea",
        awayTeamName: "USA",
      },
    ],
  };

  // 팀 정보
  const testInfo = {
    id: 1,
    name: "축구",
    description:
      "축구(蹴球, 영어: Association football, 일부 국가에서는 Soccer)는 11명의 선수들이 각각 한 팀을 이루어 두 팀이 겨루는 구기 스포츠로, 세계적으로 최고 인기를 누리는 스포츠이다.[1] 경기장은 직사각형이며, 바닥은 천연잔디나 인조잔디, 흙 등으로 이뤄져 있다. 경기장 양 끝에 놓인 상대방 골대 안으로 공을 통과시키면 득점이 된다. 선수 중 골키퍼만 팔과 손으로도 공을 건드릴 수 있으나, 팔과 손을 사용할 수 있는 구역이 제한되어 있다. 나머지 선수는 팔과 손을 제외한 신체 부위로만 공을 다룰 수 있다. 골키퍼 외의 선수가 경기장 안에서 팔이나 손으로 공을 고의로 다루면[2] 핸드볼 반칙[3] 이 된다. 주로 발을 사용하여 공을 차며, 공이 공중에 떠있을 때에는 몸과 머리를 이용하는 것이 보통이다. 경기 종료 시점까지 더 많은 득점을 올린 팀이 승리하며, 동점일 때는 대회 규칙에 따라 무승부로 처리하거나 연장전과 승부차기로 승패를 결정 짓는다. 경기 방식이 리그일 경우에는 연장전 없이 무승부로 처리가 되며 토너먼트일 경우에도 홈 앤드 어웨이 방식을 채택할 경우에는 무승부로 처리되어 원정 다득점 원칙을 따르지만, 단판의 토너먼트일 때는 무승부가 되면 연장전과 승부차기로 승패를 결정하게 된다.",
  };

  const [subMenu, setSubMenu] = useState(0);
  const [teamList, setTeamList] = useState(testTeamList);
  const [record, setRecord] = useState(testRecord);
  const [teamInfo, setTeamInfo] = useState(testInfo);

  const [modifyOpen, setModifyOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);

  const modifyTeamInfo = (info) => {
    setTeamInfo(info);
  };

  const modifyTeamList = (user) => {
    setTeamList(teamList.concat(user));
  };

  useEffect(() => {
    //   axios({
    //     method: "post",
    //     url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team`,
    //     data: user,
    //     headers: {},
    //   }) .then(() => {
    //     console.log("success");
    //   })
    //   .catch((e) => {
    //     console.log("error", e);
    //     console.log("fail");
    //   });;
    // }, []);
  });

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
      <Parallax
        filter
        image={require("assets/img/teamInfobg.jpg")}
        style={{ alignItems: "stretch" }}
      >
        <div className={classes.container}>
          <GridContainer spacing={3}>
            <GridItem xs={12}>
              <div style={{ display: "inline-block" }}>
                <Tooltip
                  id="tooltip-ALA"
                  title={teamInfo.description}
                  placement="bottom-start"
                >
                  <h1>{teamInfo.name}</h1>
                </Tooltip>
              </div>
              {/* 팀장인 경우만 보이게 */}
              <Button
                size="sm"
                onClick={() => {
                  setModifyOpen(true);
                }}
              >
                수정
              </Button>
            </GridItem>
            <GridItem
              xs={12}
              sm={6}
              style={{
                textAlign: "center",
              }}
            >
              <Paginations
                pages={[{ text: "4:4" }, { text: "5:5" }, { text: "6:6" }]}
                color="primary"
              />
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
              <TableContainer className={subMenu !== 0 && classes.hiddenTable}>
                <Table className={classes.table}>
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
                      <TableRow key={teamList.id}>
                        <TableCell>{teamList.name}</TableCell>
                        <TableCell>{teamList.position}</TableCell>
                        <TableCell>{teamList.age}</TableCell>
                        <TableCell>{teamList.height}</TableCell>
                        <TableCell>{teamList.weight}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  onClick={() => {
                    setAddUserOpen(true);
                  }}
                >
                  +
                </Button>
              </TableContainer>
              {/* 전적 정보 */}
              <div
                className={
                  subMenu === 1 ? classes.record : classes.hiddenRecord
                }
              >
                <h3>
                  {record.win}승 {record.lose}패 {record.draw}무
                </h3>
                <TableContainer className={classes.table}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>HOME</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>AWAY</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {record.result.map((result) => (
                        <TableRow key={result.resultid}>
                          <TableCell>{result.homeTeamName}</TableCell>
                          <TableCell>{result.homeScore}</TableCell>
                          <TableCell>{result.awayScore}</TableCell>
                          <TableCell>{result.awayTeamName}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
      <ModifyTeamInfoDialog
        open={modifyOpen}
        onClose={() => {
          setModifyOpen(false);
        }}
        teamInfo={teamInfo}
        modifyTeamInfo={modifyTeamInfo}
      />
      <AddUserDialog
        open={addUserOpen}
        onClose={() => {
          setAddUserOpen(false);
        }}
        modifyTeamList={modifyTeamList}
      />
    </div>
  );
}
