import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "components/CustomButtons/Button.js";

import { Modal, Typography } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

import { Link } from "react-router-dom";

import axios from "axios";

export default function ReceivedMatch({ userinfo }) {
  const [requestModal, setRequestModal] = useState(false);
  const [requestList, setRequestList] = useState([
    {
      teamID: 3,
      profileURL: "",
      name: "풋살라",
      wins: 3,
      defeats: 4,
      draws: 7,
      reliablity: 8,
    },
    {
      teamID: 4,
      profileURL: "",
      name: "풋게로",
      wins: 6,
      defeats: 5,
      draws: 2,
      reliablity: 5,
    },
  ]);

  const [receivedList, setReceivedList] = useState([]);

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

  const handleRequestListOpen = () => {
    // request list 받아오기
    setRequestModal(true);
  };
  const handleRequestListClose = () => {
    setRequestModal(false);
  };

  // 등록한 매칭 삭제
  const removeMatch = (id) => {
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
  };

  return (
    <div style={{ height: "750px", overflow: "auto" }}>
      <List>
        {receivedList.length === 0 ? (
          <div>
            <h3 style={{ textAlign: "center" }}>등록된 매칭이 없습니다.</h3>
          </div>
        ) : (
          receivedList.map((rl) => (
            <ListItem>
              <ListItemAvatar>
                <img
                  src={rl.profileURL}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
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
                secondary={`${rl.sido} ${rl.gu} ${rl.name} / 예약여부:${
                  rl.isBooked ? "O" : "X"
                } `}
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
                variant="contained"
                onClick={() => {
                  handleRequestListOpen();
                }}
                style={{
                  width: "10%",
                  backgroundColor: "#05b0c4",
                }}
              >
                신청 관리
              </Button>
              <Button
                small
                variant="contained"
                onClick={() => {
                  if (window.confirm("이 매칭을 삭제하시겠습니까?")) {
                    removeMatch(rl.matchID);
                  }
                }}
                style={{
                  width: "10%",
                  backgroundColor: "#05b0c4",
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
            <List>
              {requestList.map((rl) => (
                <ListItem>
                  <ListItemAvatar>
                    {/* 팀 로고 넣기*/}
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "black",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${rl.name}`}
                    secondary={`${rl.wins}승 ${rl.defeats}패 ${rl.draws}무 / 신뢰도 ${rl.reliablity}`}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (
                        window.confirm("이 팀의 매칭 신청을 수락하시겠습니까?")
                      ) {
                        alert("수락");
                      }
                    }}
                    style={{
                      width: "10%",
                      backgroundColor: "#05b0c4",
                    }}
                  >
                    수락
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (
                        window.confirm("이 팀의 매칭 신청을 거절하시겠습니까?")
                      ) {
                        alert("거절");
                      }
                    }}
                    style={{
                      width: "10%",
                      backgroundColor: "#05b0c4",
                    }}
                  >
                    거절
                  </Button>
                </ListItem>
              ))}
            </List>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
