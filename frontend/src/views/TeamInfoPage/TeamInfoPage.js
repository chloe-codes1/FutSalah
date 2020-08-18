import { Grid, Modal, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import AddUserDialog from "components/Dialog/AddUserDialog";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "components/CustomButtons/Button.js";
import ChatIcon from "@material-ui/icons/Chat";
import { DndProvider } from "react-dnd";
import Dropzone from "../Dropzone/Dropzone";
import Fade from "@material-ui/core/Fade";
import Footer from "components/Footer/Footer.js";
import Formation from "views/Components/Formation/Formation";
import { FormationBench } from "views/Components/Formation/FormationBench";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { HTML5Backend } from "react-dnd-html5-backend";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Loading from "views/Components/Loading/Loading";
// Dialogs
import ModifyTeamInfoDialog from "components/Dialog/ModifyTeamInfoDialog";
import NavPills from "components/NavPills/NavPills.js";
import Paginations from "components/Pagination/Pagination.js";
import { Player } from "views/Components/Formation/Player";
import Popover from "@material-ui/core/Popover";
import RemoveIcon from "@material-ui/icons/Remove";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import styles from "assets/jss/material-kit-react/views/teamInfoPage.js";
import teamInfobg from "assets/img/teamInfobg2.jpg";

// // react components for routing our app without refresh
// import { Link } from "react-router-dom";

// table style
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4a7c59",
    color: theme.palette.common.white,
    padding: "5px 0",
  },
  body: {
    fontSize: 14,
    padding: 0,
    padding: "5px 0",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(styles);
const modalStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
}));

export default function TeamInfoPage(props) {
  const classes = useStyles();
  const modal = modalStyles();
  const { ...rest } = props;

  const [dropZone, setDropZone] = useState(false);
  const [QRcodeZone, setQRcodeZone] = useState(false);
  // const params = new URLSearchParams(paramsString);
  // const id = params.get("id");

  // 팀 정보
  const TeamId = rest.match.params.id;
  const { userinfo } = useContext(UserContext);
  const [teamList, setTeamList] = useState([]); // 팀원 목록
  const [record, setRecord] = useState([]); // 경기전적 목록
  const [requestList, setRequestList] = useState([]); // 팀원 신청 목록
  const [teamInfo, setTeamInfo] = useState({}); // 팀 정보
  const [teamImage, setTeamImage] = useState(""); // 팀 이미지
  const [loading, setLoading] = useState(true); // 로딩 여부
  const [playerPos1, setPlayerPos1] = useState([]); // 포메이션 정보 (5:5)
  const [playerPos2, setPlayerPos2] = useState([]); // 포메이션 정보 (6:6)

  const [modifyOpen, setModifyOpen] = useState(false); // 팀 정보 창
  const [addUserOpen, setAddUserOpen] = useState(false); // 팀원 추가 창
  const [anchorEl, setAnchorEl] = useState(null); // 팝오버 열릴지 아닐지
  const [openedPopoverId, setOpenedPopoverId] = useState(null); // 팀원 팝오버 인덱스
  const [openedJoinPopoverId, setOpenedJoinPopoverId] = useState(null); // 신청 유저 팝오버 인덱스
  const [openedDescPopoverId, setOpenedDescPopoverId] = useState(null); // 팀 설명 오픈 여부

  const handleDropZone = () => {
    setDropZone(true);
  };

  const handleDropZoneClose = () => {
    setDropZone(false);
  };

  const handleQRcodeZone = () => {
    setQRcodeZone(true);
  };

  const handleQRcodeZoneClose = () => {
    setQRcodeZone(false);
  };

  // 팀 정보 가져오기
  const getTeamInfo = async () => {
    setLoading(true);

    await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/${TeamId}`,
    })
      .then((res) => {
        // console.log("success");
        let profileURL = res.data.profileURL;

        if (profileURL) {
          setTeamImage(process.env.REACT_APP_S3_BASE_URL + "/" + profileURL);
        } else {
          setTeamImage(
            process.env.REACT_APP_S3_BASE_URL +
              "/team-default-" +
              Math.ceil(Math.random()*8) +
              ".png"
          );
        }
        setTeamInfo(res.data);
        // 지역 정보 가져오기
        axios({
          method: "get",
          url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/location/${res.data.locationID}`,
        })
          .then((res) => {
            setTeamInfo((prevState) => ({
              ...prevState,
              region: res.data.sido + " " + res.data.gu,
            }));
          })
          .catch((e) => {
            console.log("error", e);
          });
      })
      .catch((e) => {
        console.log("error", e);
      });

    setLoading(false);
  };

  // 팀원 목록 가져오기
  const getTeamList = async () => {
    setLoading(true);
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/member/${TeamId}`,
    })
      .then((res) => {
        // console.log("팀원 정보 success");
        res.data.map((member) => {
          if (member.profileURL !== null) {
            if (member.profileURL.indexOf("http") === -1) {
              member.profileURL =
                process.env.REACT_APP_S3_BASE_URL + "/" + member.profileURL;
            }
          }
        });
        // console.log(res.data);
        setTeamList(res.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
    setLoading(false);
  };

  // 경기 전적 가져오기
  const getRecord = async () => {
    setLoading(true);

    await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/result/${TeamId}`,
    })
      .then((res) => {
        // console.log(res.data);
        setRecord(res.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
    setLoading(false);
  };

  // 가입 신청 목록 가져오기
  const getRequestList = async () => {
    setLoading(true);
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/join/${TeamId}`,
    })
      .then((res) => {
        // console.log(res.data);
        res.data.map((member) => {
          if (member.profileURL !== null) {
            if (member.profileURL.indexOf("http") === -1) {
              member.profileURL =
                process.env.REACT_APP_S3_BASE_URL + "/" + member.profileURL;
            }
          }
        });
        setRequestList(res.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
    setLoading(false);
  };

  // 포메이션 정보 가져오기
  const getFormation = async () => {
    setLoading(true);

    await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/formation/${TeamId}`,
    })
      .then(async (res) => {
        // console.log("포메이션 success");
        console.log(res.data);
        const list1 = [];
        const list2 = [];

        await res.data.map((pos) => {
          if (Number(pos.formCode) === 5)
            list1.push({
              userID: pos.userID,
              grid: pos.grid,
              name: pos.name,
              position: pos.position,
            });
          else if (Number(pos.formCode) === 6)
            list2.push({
              userID: pos.userID,
              grid: pos.grid,
              name: pos.name,
              position: pos.position,
            });
        });

        setPlayerPos1(list1);
        setPlayerPos2(list2);
      })
      .catch((e) => {
        console.log("error", e);
      });

    setLoading(false);
  };

  // 팀 정보 변경
  const modifyTeamInfo = async (info) => {
    setLoading(true);

    setTeamInfo(info);
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/${TeamId}`,
      data: info,
    })
      .then((res) => {
        // console.log("update success");
        alert("성공적으로 팀정보를 변경하였습니다!");
      })
      .catch((e) => {
        console.log("error", e);
      });

    setLoading(false);
  };

  // 팀원 추가
  const modifyTeamList = (user) => {
    setTeamList(teamList.concat(user));
  };

  // 선수 방출
  const removeTeamList = async (id) => {
    setLoading(true);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/member`,
      data: {
        teamID: teamInfo.teamID,
        userID: id,
      },
    })
      .then(() => {
        // console.log("remove member success");
        getFormation();
      })
      .catch((e) => {
        // console.log("error", e);
      });

    setTeamList(teamList.filter((tl) => tl.userID !== id));
    setPlayerPos1(playerPos1.filter((pp) => pp.userID !== id));
    setPlayerPos2(playerPos2.filter((pp) => pp.userID !== id));

    setLoading(false);
  };

  // 포메이션 선수 제거 (5:5)
  const removePlayer1 = (grid) => {
    setPlayerPos1(playerPos1.filter((pp) => pp.grid !== grid));
  };

  // 포메이션 선수 제거 (6:6)
  const removePlayer2 = (grid) => {
    setPlayerPos2(playerPos2.filter((pp) => pp.grid !== grid));
  };

  // 포메이션 저장
  const storeFormation = async (formCode) => {
    setLoading(true);

    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/formation/${TeamId}/${formCode}`,
    })
      .then(() => {
        console.log("delete formation success");
        let playerPos;
        if (formCode === 5) playerPos = playerPos1;
        else if (formCode == 6) playerPos = playerPos2;
        playerPos.map((pp) => {
          console.log(pp);
          axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/formation`,
            data: {
              formCode,
              grid: pp.grid,
              teamID: TeamId,
              userID: pp.userID,
            },
          })
            .then(() => {
              console.log("insert formation success");
            })
            .catch((e) => {
              console.log("error", e);
            });
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
    setLoading(false);
  };

  // 팀 가입 신청
  const requestJoin = async () => {
    setLoading(true);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/join`,
      data: {
        teamID: teamInfo.teamID,
        userID: userinfo.userID,
      },
    })
      .then(() => {
        alert("가입 신청이 성공적으로 이루어졌습니다!");
      })
      .catch((e) => {
        console.log("error", e);
      });
    setLoading(false);
  };

  // 팀 가입 신청 수락
  const acceptJoin = async (id, name) => {
    setLoading(true);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/join/approve`,
      data: {
        userID: id,
        teamID: teamInfo.teamID,
      },
    })
      .then(() => {
        // console.log("success");
        setRequestList(requestList.filter((rl) => rl.userID !== id));
        getTeamList();

        alert(name + "님의 가입 신청을 승낙하였습니다!");
      })
      .catch((e) => {
        console.log("error", e);
      });
    setLoading(false);
  };

  // 팀 가입 신청 거절
  const rejectJoin = async (id, name) => {
    setLoading(true);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/join/refuse`,
      data: {
        userID: id,
        teamID: teamInfo.teamID,
      },
    })
      .then(() => {
        // console.log("success");
        setRequestList(requestList.filter((rl) => rl.userID !== id));
        alert(name + "님의 가입 신청을 거절하였습니다!");
      })
      .catch((e) => {
        console.log("error", e);
      });
    setLoading(false);
  };

  useEffect(() => {
    // 팀 정보 가져오기
    getTeamInfo();

    // 팀원 목록 가져오기
    getTeamList();

    // 경기 전적 정보 가져오기
    getRecord();

    // 가입 신청 목록 가져오기
    getRequestList();

    // 포메이션 정보 가져오기
    getFormation();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${teamInfobg})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <Header
        brand="FutSalah"
        color="transparent"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "white",
        }}
        {...rest}
      />
      <div className={classes.container}>
        <DndProvider backend={HTML5Backend}>
          {loading ? (
            <div
              style={{
                minHeight: "700px",
              }}
            >
              <Loading />
            </div>
          ) : (
            <GridContainer
              justify="center"
              style={{
                backgroundColor: "rgba( 0, 0, 0, 0.7 )",
                borderRadius: "15px",
                minHeight: "700px",
              }}
            >
              {/* header 부분 */}
              <GridItem className={classes.title} xs={11}>
                {Number(userinfo.userID) === teamInfo.leader ? (
                  <Tooltip title="팀 대표 사진 변경하기" interactive>
                    <img
                      className={classes.logo}
                      src={teamImage}
                      alt="team"
                      onClick={
                        Number(userinfo.userID) === teamInfo.leader
                          ? handleDropZone
                          : () => {}
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                ) : (
                  <img
                    className={classes.logo}
                    src={teamImage}
                    alt="team"
                    onClick={
                      Number(userinfo.userID) === teamInfo.leader
                        ? handleDropZone
                        : () => {}
                    }
                  />
                )}
                <div
                  style={{
                    margin: "auto 2%",
                  }}
                >
                  <span>{teamInfo.region}</span>
                  <Tooltip title="팀 설명 보기" interactive>
                    <div
                      onClick={(e) => {
                        setAnchorEl(e.target);
                        setOpenedDescPopoverId(true);
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <h1>
                        <strong>{teamInfo.name}</strong>
                      </h1>
                    </div>
                  </Tooltip>
                  <Popover
                    classes={{
                      paper: classes.popover,
                    }}
                    open={openedDescPopoverId}
                    anchorEl={anchorEl}
                    onClose={() => {
                      setAnchorEl(null);
                      setOpenedDescPopoverId(null);
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <h3 className={classes.popoverHeader}>팀 설명</h3>
                    <p className={classes.popoverBody}>
                      {teamInfo.description}
                    </p>
                  </Popover>
                </div>
                {/* 가입 신청 버튼, QR 코드 버튼 */}
                {userinfo.logged &&
                  (teamList.find(
                    (t) => t.userID === Number(userinfo.userID)
                  ) === undefined ? (
                    <Button
                      color="teamInfo"
                      className={classes.modifyButton}
                      size="sm"
                      onClick={() => {
                        if (
                          window.confirm("이 팀에 가입신청을 하시겠습니까?")
                        ) {
                          requestJoin();
                        }
                      }}
                    >
                      가입 신청 하기
                    </Button>
                  ) : (
                    <Button
                      color="teamInfo"
                      className={classes.modifyButton}
                      size="sm"
                      onClick={handleQRcodeZone}
                    >
                      QR코드
                    </Button>
                  ))}
                {/* 팀 정보 변경 버튼 */}
                {Number(userinfo.userID) === teamInfo.leader && (
                  <Button
                    color="teamInfo"
                    className={classes.modifyButton}
                    size="sm"
                    onClick={() => {
                      setModifyOpen(true);
                    }}
                  >
                    수정
                  </Button>
                )}
              </GridItem>
              {/* 포메이션 부분 */}
              <GridItem className={classes.formation} xs={10} md={5}>
                <NavPills
                  color="teamInfo"
                  horizontal={{
                    tabsGrid: { xs: 3, sm: 3, md: 3 },
                    contentGrid: { xs: 9, sm: 9, md: 9 },
                  }}
                  tabs={[
                    {
                      // 5:5 포메이션
                      tabButton: "5:5",
                      tabContent: (
                        <GridContainer
                          style={{
                            margin: 0,
                          }}
                          justify="space-evenly"
                        >
                          <GridItem
                            xs={12}
                            style={{
                              height: "60px",
                            }}
                          >
                            {Number(userinfo.userID) === teamInfo.leader && (
                              <div
                                style={{
                                  marginTop: "25px",
                                  textAlign: "center",
                                  fontSize: 12,
                                }}
                              >
                                Tip. 선수를 드래그해서 배치해보세요.
                              </div>
                            )}
                          </GridItem>
                          <GridItem
                            xs={12}
                            style={{
                              margin: 0,
                            }}
                          >
                            <Formation
                              movable={
                                Number(userinfo.userID) === teamInfo.leader
                              }
                              playerPos={playerPos1}
                              setPlayerPos={setPlayerPos1}
                              memberNum={5}
                            />
                          </GridItem>
                          {Number(userinfo.userID) === teamInfo.leader && (
                            <>
                              <GridItem xs={7}>
                                <FormationBench removePlayer={removePlayer1} />
                              </GridItem>
                              <GridItem xs={5}>
                                <Button
                                  color="teamInfo"
                                  onClick={() => {
                                    storeFormation(5);
                                    alert("포메이션이 저장되었습니다!");
                                  }}
                                  style={{
                                    marginTop: "10px",
                                    width: "100%",
                                    height: "40px",
                                  }}
                                >
                                  <strong>
                                    포메이션
                                    <br />
                                    저장
                                  </strong>
                                </Button>
                              </GridItem>
                              <GridItem>
                                <div
                                  style={{
                                    fontSize: 10,
                                  }}
                                >
                                  Tip. 선수를 벤치에 드래그해서 뺼 수 있습니다.
                                </div>
                              </GridItem>
                            </>
                          )}
                        </GridContainer>
                      ),
                    },
                    {
                      // 6:6 포메이션
                      tabButton: "6:6",
                      tabContent: (
                        <GridContainer
                          style={{
                            margin: 0,
                          }}
                          justify="space-evenly"
                        >
                          <GridItem xs={12} style={{ height: "60px" }}>
                            {Number(userinfo.userID) === teamInfo.leader && (
                              <div
                                style={{
                                  marginTop: "25px",
                                  textAlign: "center",
                                  fontSize: 12,
                                }}
                              >
                                Tip. 선수를 드래그해서 배치해보세요.
                              </div>
                            )}
                          </GridItem>
                          <GridItem
                            xs={12}
                            style={{
                              margin: 0,
                            }}
                          >
                            <Formation
                              movable={
                                Number(userinfo.userID) === teamInfo.leader
                              }
                              playerPos={playerPos2}
                              setPlayerPos={setPlayerPos2}
                              memberNum={5}
                            />
                          </GridItem>
                          {Number(userinfo.userID) === teamInfo.leader && (
                            <>
                              <GridItem xs={7}>
                                <FormationBench removePlayer={removePlayer2} />
                              </GridItem>
                              <GridItem xs={5}>
                                <Button
                                  color="teamInfo"
                                  onClick={() => {
                                    storeFormation(6);
                                    alert("포메이션이 저장되었습니다!");
                                  }}
                                  style={{
                                    marginTop: "10px",
                                    width: "100%",
                                    height: "40px",
                                  }}
                                >
                                  <strong>
                                    포메이션
                                    <br />
                                    저장
                                  </strong>
                                </Button>
                              </GridItem>
                              <GridItem>
                                <div
                                  style={{
                                    fontSize: 10,
                                  }}
                                >
                                  Tip. 선수를 벤치에 드래그해서 뺼 수 있습니다.
                                </div>
                              </GridItem>
                            </>
                          )}
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
              {/* 팀원, 전적, 신청관리 */}
              <GridItem className={classes.management} xs={10} md={5}>
                <NavPills
                  color="teamInfo"
                  tabs={[
                    {
                      // 팀원목록
                      tabButton: "팀원",
                      tabContent: (
                        <div>
                          <TableContainer className={classes.table}>
                            <div
                              style={{
                                height: "350px",
                                overflow: "auto",
                                borderRadius: "5px",
                              }}
                            >
                              <Table size="small">
                                <TableBody
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  {teamList.map((t, index) => (
                                    <Player
                                      movable={
                                        Number(userinfo.userID) ===
                                        teamInfo.leader
                                      }
                                      key={index}
                                      player={{
                                        name: t.name,
                                        position: t.position,
                                        userID: t.userID,
                                      }}
                                    >
                                      <TableRow>
                                        <TableCell
                                          rowSpan={2}
                                          align="center"
                                          width="20%"
                                        >
                                          <img
                                            className={classes.memberImg}
                                            src={t.profileURL}
                                          />
                                        </TableCell>
                                        <TableCell
                                          width="50%"
                                          style={{
                                            borderBottom: "none",
                                          }}
                                        >
                                          {teamInfo.leader === t.userID && (
                                            <StarsRoundedIcon />
                                          )}
                                          {t.position !== ""
                                            ? t.position
                                            : "포지션 없음"}
                                        </TableCell>
                                        <TableCell
                                          rowSpan={2}
                                          align="center"
                                          width="30%"
                                        >
                                          {/* 채팅 버튼 */}
                                          {userinfo.logged &&
                                            Number(userinfo.userID) !==
                                              t.userID && (
                                              <Button
                                                color="teamInfo"
                                                size="sm"
                                                onClick={() => {}}
                                                style={{
                                                  maxWidth: "3vw",
                                                }}
                                              >
                                                <ChatIcon />
                                              </Button>
                                            )}
                                          {Number(userinfo.userID) ===
                                            teamInfo.leader &&
                                            t.userID !== teamInfo.leader && (
                                              <Button
                                                color="teamInfo"
                                                size="sm"
                                                onClick={() => {
                                                  if (
                                                    window.confirm(
                                                      "정말 이 선수를 방출하시겠습니까?"
                                                    )
                                                  ) {
                                                    removeTeamList(t.userID);
                                                  }
                                                }}
                                                style={{
                                                  maxWidth: "3vw",
                                                }}
                                              >
                                                <RemoveIcon />
                                              </Button>
                                            )}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow hover>
                                        <TableCell>
                                          <div
                                            onClick={(e) => {
                                              setAnchorEl(e.target);
                                              setOpenedPopoverId(t.userID);
                                            }}
                                            style={{
                                              fontSize: 20,
                                              fontWeight: 400,
                                            }}
                                          >
                                            {t.name}
                                          </div>
                                          <Popover
                                            classes={{
                                              paper: classes.popover,
                                            }}
                                            open={openedPopoverId === t.userID}
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
                                            <h3
                                              className={classes.popoverHeader}
                                            >
                                              {t.name}
                                            </h3>
                                            <div
                                              className={classes.popoverBody}
                                            >
                                              <h5>{t.position}</h5>
                                              <div>출생연도: {t.age}</div>
                                              <div>키: {t.height}</div>
                                              <div>몸무게: {t.weight}</div>
                                            </div>
                                          </Popover>
                                        </TableCell>
                                      </TableRow>
                                    </Player>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </TableContainer>
                          {Number(userinfo.userID) === teamInfo.leader && (
                            <Button
                              color="teamInfo"
                              onClick={() => {
                                setAddUserOpen(true);
                              }}
                            >
                              <AddIcon />
                            </Button>
                          )}
                        </div>
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
                                      &lt;{teamInfo.wins}승 {teamInfo.draws}무{" "}
                                      {teamInfo.defeats}패 &gt;
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
                              {record.map((result, index) => (
                                <TableRow key={index}>
                                  <TableCell align="center">
                                    {result.homeTeam === teamInfo.name ? (
                                      <strong>{result.homeTeam}</strong>
                                    ) : (
                                      result.homeTeam
                                    )}
                                  </TableCell>
                                  <TableCell align="center">
                                    {result.homeScore}
                                  </TableCell>
                                  <TableCell align="center">
                                    {result.awayScore}
                                  </TableCell>
                                  <TableCell align="center">
                                    {result.awayTeam === teamInfo.name ? (
                                      <strong>{result.awayTeam}</strong>
                                    ) : (
                                      result.awayTeam
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ),
                    },
                    Number(userinfo.userID) === teamInfo.leader
                      ? {
                          // 팀원신청관리
                          tabButton: "팀원 신청 관리",
                          tabContent: (
                            <TableContainer className={classes.table}>
                              <Table stickyHeader size="small">
                                <TableHead>
                                  <StyledTableRow>
                                    <StyledTableCell width="20%"></StyledTableCell>
                                    <StyledTableCell width="20%" align="center">
                                      포지션
                                    </StyledTableCell>
                                    <StyledTableCell width="20%" align="center">
                                      이름
                                    </StyledTableCell>
                                    <StyledTableCell
                                      width="40%"
                                      colSpan="2"
                                    ></StyledTableCell>
                                  </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                  {requestList.map((r, index) => (
                                    <StyledTableRow key={index}>
                                      <StyledTableCell
                                        width="20%"
                                        align="center"
                                      >
                                        <img
                                          className={classes.memberImg}
                                          src={
                                            r.profileURL === null
                                              ? teamImage
                                              : r.profileURL
                                          }
                                        />
                                      </StyledTableCell>
                                      <StyledTableCell
                                        width="20%"
                                        align="center"
                                      >
                                        {r.position !== ""
                                          ? r.position
                                          : "없음"}
                                      </StyledTableCell>
                                      <StyledTableCell
                                        width="20%"
                                        align="center"
                                      >
                                        <Button
                                          style={{
                                            maxWidth: "6vw",
                                          }}
                                          onClick={(e) => {
                                            setAnchorEl(e.target);
                                            setOpenedJoinPopoverId(r.userID);
                                          }}
                                          color="transparent"
                                        >
                                          {r.name}
                                        </Button>
                                        <Popover
                                          classes={{
                                            paper: classes.popover,
                                          }}
                                          open={
                                            openedJoinPopoverId === r.userID
                                          }
                                          anchorEl={anchorEl}
                                          onClose={() => {
                                            setAnchorEl(null);
                                            setOpenedJoinPopoverId(null);
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
                                            {r.name}
                                          </h3>
                                          <div className={classes.popoverBody}>
                                            <h5>{r.position}</h5>
                                            <div>출생연도: {r.age}</div>
                                            <div>키: {r.height}</div>
                                            <div>몸무게: {r.weight}</div>
                                          </div>
                                        </Popover>
                                      </StyledTableCell>
                                      <StyledTableCell
                                        width="40%"
                                        align="center"
                                      >
                                        <Button
                                          color="teamInfo"
                                          style={{
                                            maxWidth: "3vw",
                                          }}
                                          onClick={
                                            // 신청 승낙
                                            () => {
                                              if (
                                                window.confirm(
                                                  "정말 이 신청을 승낙하시겠습니까?"
                                                )
                                              ) {
                                                acceptJoin(r.userID, r.name);
                                              }
                                            }
                                          }
                                        >
                                          <AddIcon />
                                        </Button>
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        <Button
                                          color="teamInfo"
                                          style={{
                                            maxWidth: "3vw",
                                          }}
                                          onClick={
                                            // 신청 거절
                                            () => {
                                              if (
                                                window.confirm(
                                                  "정말 이 신청을 거절하시겠습니까?"
                                                )
                                              ) {
                                                rejectJoin(r.userID, r.name);
                                              }
                                            }
                                          }
                                        >
                                          <RemoveIcon />
                                        </Button>
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ),
                        }
                      : { disabled: true },
                  ]}
                />
              </GridItem>
            </GridContainer>
          )}
        </DndProvider>
      </div>
      {/* <Footer /> */}
      <ModifyTeamInfoDialog
        open={modifyOpen}
        onClose={() => {
          setModifyOpen(false);
        }}
        teamInfo={teamInfo}
        modifyTeamInfo={modifyTeamInfo}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      />
      <AddUserDialog
        open={addUserOpen}
        onClose={() => {
          setAddUserOpen(false);
        }}
        teamID={teamInfo.teamID}
        modifyTeamList={modifyTeamList}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={modal.modal}
        open={dropZone}
        onClose={handleDropZoneClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={dropZone}>
          <div className={modal.paper} align="center">
            <Grid mt={5}>
              <Dropzone align="center" ID={teamInfo.teamID} path="team" />
            </Grid>
            <Typography
              id="transition-modal-title"
              style={{ marginTop: "10px", marginBottom: "15px" }}
            >
              당신의 팀을 나타내는 사진을 업로드 하세요!
            </Typography>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={modal.modal}
        open={QRcodeZone}
        onClose={handleQRcodeZoneClose}
        closeAfterTransition
      >
        <Fade in={QRcodeZone}>
          <div className={modal.paper} align="center">
            <Grid mt={5}>
              {/* 여기에 qr코드 */}
              <div
                style={{
                  backgroundColor: "black",
                  width: "100px",
                  height: "100px",
                }}
              ></div>
            </Grid>
            <Typography
              id="transition-modal-title"
              style={{ marginTop: "10px", marginBottom: "15px" }}
            >
              팀정보 QR코드
            </Typography>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
