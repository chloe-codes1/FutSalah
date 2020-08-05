import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddUserDialog from "components/Dialog/AddUserDialog";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Formation from "views/Components/Formation/Formation";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Popover from "@material-ui/core/Popover";

// Dialogs
import ModifyTeamInfoDialog from "components/Dialog/ModifyTeamInfoDialog";
import Paginations from "components/Pagination/Pagination.js";
import Parallax from "components/Parallax/Parallax.js";

import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/teamInfoPage.js";

import teamImage from "assets/img/basicTeamImg1.jpg";

// // react components for routing our app without refresh
// import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  // const params = new URLSearchParams(paramsString);
  // const id = params.get("id");

  // 테스트 데이터
  // 팀원 목록
  const testTeamList = [
    {
      id: 1,
      name: "김싸피",
      position: "Pixo",
      age: 25,
      height: 200,
      weight: 100,
    },
    {
      id: 2,
      name: "이철수",
      position: "Ala",
      age: 26,
      height: 190,
      weight: 130,
    },
    {
      id: 3,
      name: "박영희",
      position: "ALL",
      age: 24,
      height: 220,
      weight: 110,
    },
    {
      id: 4,
      name: "바둑이",
      position: "Golerio",
      age: 5,
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
  const TeamId = rest.match.params.id;

  const [subMenu, setSubMenu] = useState(0); // 팀운리스트, 전적 버튼 안덱스
  const [teamList, setTeamList] = useState([]); // 팀원 목록
  const [record, setRecord] = useState(testRecord); // 경기전적 목록
  const [teamInfo, setTeamInfo] = useState({}); // 팀 정보

  const [playerPos1, setPlayerPos1] = useState([
    {
      idx: 8,
      name: "김싸피",
      position: "ALA",
    },
    {
      idx: 0,
      name: "박철수",
      position: "GOLERIO",
    },
    {
      idx: 12,
      name: "이영희",
      position: "FIXO",
    },
    {
      idx: 19,
      name: "바둑이",
      position: "PIVO",
    },
  ]); // 포메이션 정보
  const [playerPos2, setPlayerPos2] = useState([]); // 포메이션 정보

  const [modifyOpen, setModifyOpen] = useState(false); // 팀 정보 창
  const [addUserOpen, setAddUserOpen] = useState(false); // 팀원 추가 창
  const [anchorEl, setAnchorEl] = useState(null); // 팝오버 열릴지 아닐지
  const [openedPopoverId, setOpenedPopoverId] = useState(null); // 팀원 팝오버 인덱스

  const modifyTeamInfo = (info) => {
    setTeamInfo(info);
  };

  const modifyTeamList = (user) => {
    setTeamList(teamList.concat(user));
  };

  const removeTeamList = (id) => {
    setTeamList(teamList.filter((tl) => tl.id !== id));
  };

  useEffect(() => {
    // 팀 정보 가져오기
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/${TeamId}`,
    })
      .then((res) => {
        console.log("success");
        // console.log(res);
        setTeamInfo({
          ...res.data,
          id: TeamId,
          region: "서울시 종로구(test data)",
        });
      })
      .catch((e) => {
        console.log("error", e);
      });

    // 팀원 목록 가져오기
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/member/${TeamId}`,
    })
      .then((res) => {
        console.log("success");
        setTeamList(res.data);
        // setTeamInfo({
        //   ...res.data,
        // });
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

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
            {/* header 부분 */}
            <GridItem className={classes.title} xs={12}>
              <img className={classes.logo} src={teamImage} alt="..." />
              <div
                style={{
                  margin: "auto 1%",
                }}
              >
                <span>{teamInfo.region}</span>
                <Tooltip
                  id="tooltip-ALA"
                  title={teamInfo.description}
                  placement="bottom-start"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <h1>
                    <strong>{teamInfo.name}</strong>
                  </h1>
                </Tooltip>
              </div>

              {/* 팀장인 경우만 보이게 */}
              <Button
                className={classes.modifyButton}
                size="sm"
                onClick={() => {
                  setModifyOpen(true);
                }}
              >
                수정
              </Button>
            </GridItem>
            {/* 포메이션 부분 */}
            <GridItem xs={12} sm={6}>
              <div
                style={{
                  marginTop: "20px",
                  marginLeft: "70%",
                  height: "50px",
                }}
              >
                <Button
                  onClick={() => {
                    // 포메이션 저장 함수넣기
                    console.log(playerPos1);
                    console.log(playerPos2);
                  }}
                >
                  <strong>포메이션 저장</strong>
                </Button>
              </div>
              <NavPills
                color="warning"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 2 },
                  contentGrid: { xs: 12, sm: 8, md: 10 },
                }}
                tabs={[
                  {
                    // 5:5 포메이션
                    tabButton: "5:5",
                    tabContent: (
                      <DndProvider backend={HTML5Backend}>
                        <Formation
                          playerPos={playerPos1}
                          setPlayerPos={setPlayerPos1}
                        />
                      </DndProvider>
                    ),
                  },
                  {
                    // 6:6 포메이션
                    tabButton: "6:6",
                    tabContent: (
                      <DndProvider backend={HTML5Backend}>
                        <Formation
                          playerPos={playerPos2}
                          setPlayerPos={setPlayerPos2}
                        />
                      </DndProvider>
                    ),
                  },
                ]}
              />
            </GridItem>
            {/* 팀원, 전적, 신청관리 */}
            <GridItem xs={12} sm={6}>
              <NavPills
                color="warning"
                tabs={[
                  {
                    // 팀원목록
                    tabButton: "팀원",
                    tabContent: (
                      <TableContainer>
                        <div className={classes.table}>
                          <Table>
                            <TableBody>
                              {teamList.map((t) => (
                                <TableRow key={t.userId}>
                                  <TableCell align="center">
                                    <img
                                      className={classes.memberImg}
                                      src={teamImage}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Button
                                      onClick={(e) => {
                                        setAnchorEl(e.target);
                                        setOpenedPopoverId(t.userId);
                                      }}
                                      color="transparent"
                                    >
                                      {t.name}
                                    </Button>
                                    <Popover
                                      classes={{
                                        paper: classes.popover,
                                      }}
                                      open={openedPopoverId === t.userId}
                                      anchorEl={anchorEl}
                                      onClose={() => {
                                        setAnchorEl(null);
                                        setOpenedPopoverId(null);
                                      }}
                                      anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                      }}
                                      transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                      }}
                                    >
                                      <h3 className={classes.popoverHeader}>
                                        {t.name}
                                      </h3>
                                      <div className={classes.popoverBody}>
                                        <h5>{t.position}</h5>
                                        <div>나이: {t.age}</div>
                                        <div>키: {t.height}</div>
                                        <div>몸무게: {t.weight}</div>
                                      </div>
                                    </Popover>
                                  </TableCell>
                                  <TableCell align="center">
                                    {t.position}
                                  </TableCell>
                                  <TableCell align="center">
                                    <Button
                                      onClick={() => {
                                        console.log(t.name + "방출");
                                        removeTeamList(t.id);
                                      }}
                                    >
                                      <RemoveIcon />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <Button
                          onClick={() => {
                            setAddUserOpen(true);
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </TableContainer>
                    ),
                  },
                  {
                    // 경기전적
                    tabButton: "경기전적",
                    tabContent: (
                      <TableContainer className={classes.table}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center" colSpan="4">
                                <h3>
                                  <strong>
                                    &lt;{record.win}승 {record.lose}패{" "}
                                    {record.draw}
                                    무&gt;
                                  </strong>
                                </h3>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell align="center">
                                <strong>HOME</strong>
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell align="center">
                                <strong>AWAY</strong>
                              </TableCell>
                            </TableRow>
                            {record.result.map((result) => (
                              <TableRow key={result.resultid}>
                                <TableCell align="center">
                                  {result.homeTeamName}
                                </TableCell>
                                <TableCell align="center">
                                  {result.homeScore}
                                </TableCell>
                                <TableCell align="center">
                                  {result.awayScore}
                                </TableCell>
                                <TableCell align="center">
                                  {result.awayTeamName}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ),
                  },
                  {
                    // 팀원신청관리
                    // 팀장만 접근 가능
                    tabButton: "팀원 신청 관리",
                    tabContent: (
                      <TableContainer className={classes.table}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell align="center">이름</TableCell>
                              <TableCell align="center">포지션</TableCell>
                              <TableCell colSpan="2"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {teamList.map((t) => (
                              <TableRow key={t.userId}>
                                <TableCell align="center">
                                  <img
                                    className={classes.memberImg}
                                    src={teamImage}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    onClick={(e) => {
                                      setAnchorEl(e.target);
                                      setOpenedPopoverId(t.userId);
                                    }}
                                    color="transparent"
                                  >
                                    {t.name}
                                  </Button>
                                  <Popover
                                    classes={{
                                      paper: classes.popover,
                                    }}
                                    open={openedPopoverId === t.userId}
                                    anchorEl={anchorEl}
                                    onClose={() => {
                                      setAnchorEl(null);
                                      setOpenedPopoverId(null);
                                    }}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "center",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "center",
                                    }}
                                  >
                                    <h3 className={classes.popoverHeader}>
                                      {t.name}
                                    </h3>
                                    <div className={classes.popoverBody}>
                                      <h5>{t.position}</h5>
                                      <div>나이: {t.age}</div>
                                      <div>키: {t.height}</div>
                                      <div>몸무게: {t.weight}</div>
                                    </div>
                                  </Popover>
                                </TableCell>
                                <TableCell align="center">
                                  {t.position}
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    onClick={() => {
                                      console.log(t.name + "영입");
                                    }}
                                  >
                                    <AddIcon />
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    onClick={() => {
                                      console.log(t.name + "은(는) 안돼");
                                    }}
                                  >
                                    <RemoveIcon />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ),
                  },
                ]}
              />
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
