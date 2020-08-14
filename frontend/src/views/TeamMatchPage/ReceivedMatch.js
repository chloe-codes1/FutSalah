import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "components/CustomButtons/Button.js";

import { Modal, Typography } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

export default function ReceivedMatch() {
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

  const [receivedList, setReceivedList] = useState([
    // 테스트 데이터
    {
      matchID: 1,
      teamID: 1,
      homeProfile: "",
      homeName: "FC 슛돌이",
      date: "2020-08-30",
      time: "12",
      location: "서울시 종로구",
      court: "종로 풋살장",
      isBooked: true,
    },
    {
      matchID: 2,
      teamID: 2,
      homeProfile: "",
      homeName: "FC 슛순이",
      date: "2020-08-22",
      time: "15",
      location: "서울시 노원구",
      court: "노원 풋살장",
      isBooked: false,
    },
  ]);

  const handleRequestListOpen = () => {
    // request list 받아오기
    setRequestModal(true);
  };
  const handleRequestListClose = () => {
    setRequestModal(false);
  };

  // 등록한 매칭 삭제
  const removeMatch = (id) => {
    setReceivedList(receivedList.filter((rl) => rl.matchID !== id));
  };

  return (
    <div style={{ height: "750px", overflow: "auto" }}>
      <List>
        {receivedList.map((rl) => (
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
            <ListItemText>{rl.homeName}</ListItemText>
            <ListItemText
              primary={`${rl.date} / ${rl.time}시`}
              secondary={`${rl.location} ${rl.court} 예약여부:${
                rl.isBooked ? "O" : "X"
              } `}
            />
            <Button
              small
              variant="contained"
              onClick={() => {
                handleRequestListOpen();
              }}
            >
              신청 관리
            </Button>
            <Button
              small
              variant="contained"
              onClick={() => {
                removeMatch(rl.matchID);
              }}
            >
              삭제
            </Button>
          </ListItem>
        ))}
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
                      console.log("수락");
                    }}
                  >
                    수락
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      console.log("거절");
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
