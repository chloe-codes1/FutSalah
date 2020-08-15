import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "components/CustomButtons/Button.js";

import { Link } from "react-router-dom";

import axios from "axios";

export default function SentMatch({ userinfo }) {
  const [sentList, setSentList] = useState([]);

  // 처음 목록 받아오기
  useEffect(() => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/requestmatch`,
      data: userinfo,
    })
      .then((res) => {
        console.log(res.data);
        setSentList(
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

  // 신청 취소
  const cancelRequest = (matchID, teamID) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/requestmatch/${matchID}/${teamID}`,
    })
      .then(() => {
        setSentList(sentList.filter((sl) => sl.matchID !== matchID));
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <div style={{ height: "750px", overflow: "auto" }}>
      <List>
        {sentList.length === 0 ? (
          <div>
            <h3 style={{ textAlign: "center" }}>신청한 매칭이 없습니다.</h3>
          </div>
        ) : (
          sentList.map((sl) => (
            <ListItem>
              <ListItemAvatar>
                {sl.profileURL ? (
                  <img
                    src={sl.profileURL}
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "white",
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                style={{
                  width: "10%",
                }}
              >
                <Link
                  to={"/teaminfo/" + sl.awayTeamID}
                  style={{ color: "black" }}
                >
                  {sl.awayteam}
                </Link>
              </ListItemText>
              <ListItemText
                style={{
                  width: "10%",
                }}
              >
                <Link
                  to={"/teaminfo/" + sl.homeTeamID}
                  style={{ color: "black" }}
                >
                  {sl.hometeam}
                </Link>
              </ListItemText>
              <ListItemText
                primary={`${sl.date} / ${sl.time}시`}
                secondary={`${sl.sido} ${sl.gu} ${sl.name} 예약여부 ${
                  sl.isBooked ? "O" : "X"
                }`}
                style={{
                  width: "30%",
                }}
              />
              <ListItemText
                primary="경기방식"
                secondary={`${sl.formCode}:${sl.formCode}`}
                style={{
                  width: "10%",
                }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  if (window.confirm("신청 취소하시겠습니까?")) {
                    cancelRequest(sl.matchID, sl.awayTeamID);
                  }
                }}
                style={{
                  width: "10%",
                  backgroundColor: "#05b0c4",
                }}
              >
                신청 취소
              </Button>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
}
