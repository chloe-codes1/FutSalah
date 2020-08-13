import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "components/CustomButtons/Button.js";

export default function SentMatch() {
  return (
    <div style={{ height: "750px", overflow: "auto" }}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <div>팀이름</div>
          </ListItemAvatar>
          <ListItemText
            primary="날짜 시간"
            secondary="지역 경기장이름 예약여부"
          />
          <ListItemText primary="상대방 팀 이름" />
          <Button
            variant="contained"
            // onClick={}
          >
            요청 취소
          </Button>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <div>팀이름</div>
          </ListItemAvatar>
          <ListItemText
            primary="날짜 시간"
            secondary="지역 경기장이름 예약여부"
          />
          <ListItemText primary="상대방 팀 이름" />
          <Button
            variant="contained"
            // onClick={}
          >
            요청 취소
          </Button>
        </ListItem>
      </List>
    </div>
  );
}
