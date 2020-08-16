import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

export default function UpcomingMatch() {
  return (
    <div style={{ height: "750px", overflow: "auto" }}>
      <List>
        <ListItem>
          <ListItemAvatar>
            {/* 팀 로고 넣기*/}
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "red",
              }}
            />
          </ListItemAvatar>
          <ListItemText primary="홈 팀 이름" style={{ textAlign: "center" }} />
          <ListItemText
            primary="날짜 시간"
            secondary="지역 경기장"
            style={{ textAlign: "center" }}
          />
          <ListItemText
            primary="어웨이 팀 이름"
            style={{ textAlign: "center" }}
          />
          <ListItemAvatar>
            {/* 팀 로고 넣기*/}
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "blue",
              }}
            />
          </ListItemAvatar>
        </ListItem>
      </List>
    </div>
  );
}
