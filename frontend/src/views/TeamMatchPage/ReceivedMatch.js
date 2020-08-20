import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "components/CustomButtons/Button.js";
import Loading from "views/Components/Loading/Loading";
import sad from "assets/img/sad.png";

import { Modal, Typography } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

import { Link } from "react-router-dom";

import axios from "axios";

export default function ReceivedMatch({ userinfo }) {
  const [loading, setLoading] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [receivedList, setReceivedList] = useState([]);
  const [selectedMatchID, setSelectedMatchID] = useState(0);

  // 처음 목록 받아오기
  useEffect(() => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/mymatch`,
      data: userinfo,
    })
      .then((res) => {
        console.log(res.data);
        setReceivedList(
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

  const handleRequestListOpen = (matchID) => {
    // request list 받아오기
    setRequestModal(true);
    getRequestList(matchID);
  };
  const handleRequestListClose = () => {
    setRequestModal(false);
  };

  // 등록한 매칭 삭제
  const removeMatch = (id) => {
    setLoading(true);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/mymatch/${id}`,
    })
      .then(() => {
        setReceivedList(receivedList.filter((rl) => rl.matchID !== id));
      })
      .catch((e) => {
        console.log("error", e);
      });
    setLoading(false);
  };

  // 신청 관리 목록 받아오기
  const getRequestList = (matchID) => {
    setSelectedMatchID(matchID);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/mymatch/${matchID}`,
    })
      .then((res) => {
        setRequestList(
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
        console.log("error" + e);
      });
  };

  // 신청 수락
  const acceptRequest = async (teamID) => {
    setLoading(true);
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/accept`,
      data: {
        teamID,
        matchID: selectedMatchID,
      },
    })
      .then(() => {
        setRequestModal(false);
      })
      .catch((e) => {
        console.log("error" + e);
      });
    setLoading(false);
  };

  // 신청 거절
  const refuseRequest = async (teamID) => {
    setLoading(true);
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/refuse`,
      data: {
        teamID,
        matchID: selectedMatchID,
      },
    })
      .then(() => {
        getRequestList(selectedMatchID);
      })
      .catch((e) => {
        console.log("error" + e);
      });
    setLoading(false);
  };

  return (
    <div style={{ height: "750px", overflow: "auto" }}>
      <List>
        {receivedList.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <h3>등록된 매칭이 없습니다.</h3>
            <img src={sad} style={{ width: "25%" }} />
          </div>
        ) : (
          receivedList.map((rl) => (
            <ListItem>
              <ListItemAvatar>
                {rl.profileURL ? (
                  <img
                    src={rl.profileURL}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "white",
                      border: "1px solid black",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        paddingTop: "12px",
                      }}
                    >
                      No Logo
                    </div>
                  </div>
                )}
              </ListItemAvatar>
              <ListItemText
                style={{
                  width: "15%",
                }}
              >
                <Link
                  to={"/teaminfo/" + rl.homeTeamID}
                  style={{ color: "black" }}
                >
                  {rl.hometeam}
                </Link>
              </ListItemText>
              <ListItemText
                primary={`${rl.date} / ${rl.time}시`}
                secondary={`${rl.sido} ${rl.gu} ${rl.name}`}
                style={{
                  width: "30%",
                }}
              />
              <ListItemText
                primary="경기방식"
                secondary={`${rl.formCode}:${rl.formCode}`}
                style={{
                  width: "15%",
                }}
              />
              <Button
                small
                color="github"
                variant="contained"
                onClick={() => {
                  handleRequestListOpen(rl.matchID);
                }}
                style={{
                  width: "10%",
                }}
              >
                신청 관리
              </Button>
              <Button
                small
                color="danger"
                variant="contained"
                onClick={() => {
                  if (window.confirm("이 매칭을 삭제하시겠습니까?")) {
                    removeMatch(rl.matchID);
                  }
                }}
                style={{
                  width: "10%",
                }}
              >
                삭제
              </Button>
            </ListItem>
          ))
        )}
      </List>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={requestModal}
        onClose={handleRequestListClose}
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={requestModal}>
          <div
            align="center"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              width: "35%",
            }}
          >
            <Typography
              id="transition-modal-title"
              style={{ marginTop: "10px", marginBottom: "15px" }}
            >
              이 매칭을 원하는 팀을 확인해보세요.
            </Typography>
            {loading ? (
              <div
                style={{
                  position: "left",
                  margin: "auto",
                  overflow: "hidden",
                }}
              >
                <Loading />
              </div>
            ) : (
              <List>
                {requestList.length === 0 ? (
                  <div>
                    <h3 style={{ textAlign: "center" }}>
                      신청한 팀이 없습니다.
                    </h3>
                  </div>
                ) : (
                  requestList.map((rl) => (
                    <ListItem>
                      <ListItemAvatar>
                        {rl.profileURL ? (
                          <img
                            src={rl.profileURL}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "white",
                              border: "1px solid black",
                              textAlign: "center",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "10px",
                                paddingTop: "12px",
                              }}
                            >
                              No Logo
                            </div>
                          </div>
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${rl.name}`}
                        secondary={`${rl.wins}승 ${rl.defeats}패 ${rl.draws}무 / 신뢰도 ${rl.reliability}`}
                      />
                      <Button
                        variant="contained"
                        color="github"
                        onClick={() => {
                          if (
                            window.confirm(
                              "이 팀의 매칭 신청을 수락하시겠습니까?"
                            )
                          ) {
                            acceptRequest(rl.teamID);
                          }
                        }}
                        style={{
                          width: "10%",
                        }}
                      >
                        수락
                      </Button>
                      <Button
                        variant="contained"
                        color="danger"
                        onClick={() => {
                          if (
                            window.confirm(
                              "이 팀의 매칭 신청을 거절하시겠습니까?"
                            )
                          ) {
                            refuseRequest(rl.teamID);
                          }
                        }}
                        style={{
                          width: "10%",
                        }}
                      >
                        거절
                      </Button>
                    </ListItem>
                  ))
                )}
              </List>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
