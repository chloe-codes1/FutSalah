import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "components/CustomButtons/Button.js";

export default function SentMatch() {
  const [sentList, setSentList] = useState([
    // 테스트 데이터
    {
      matchID: 1,
      awayTeamID: 1,
      homeTeamID: 4,
      homeProfile: "",
      awayName: "FC 슛돌이",
      homeName: "풋게로",
      date: "2020-08-30",
      time: "12",
      location: "서울시 종로구",
      court: "종로 풋살장",
      isBooked: true,
    },
    {
      matchID: 2,
      awayTeamID: 2,
      homeTeamID: 3,
      homeProfile: "",
      awayName: "FC 슛순이",
      homeName: "풋살라",
      date: "2020-08-22",
      time: "15",
      location: "서울시 노원구",
      court: "노원 풋살장",
      isBooked: false,
    },
  ]);

  // 신청 취소
  const cancelRequest = (id) => {
    setSentList(sentList.filter((sl) => sl.matchID !== id));
  };

  return (
    <div style={{ height: "750px", overflow: "auto" }}>
      <List>
        {sentList.map((sl) => (
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
            <ListItemText primary={sl.awayName} />
            <ListItemText primary={sl.homeName} />
            <ListItemText
              primary={`${sl.date} / ${sl.time}`}
              secondary={`${sl.location} ${sl.court} 예약여부 ${
                sl.isBooked ? "O" : "X"
              }`}
            />
            <Button
              variant="contained"
              onClick={() => {
                cancelRequest();
              }}
            >
              신청 취소
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
