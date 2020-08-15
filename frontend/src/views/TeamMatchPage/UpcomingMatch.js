import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import { Link } from "react-router-dom";

import axios from "axios";

export default function UpcomingMatch({ userinfo }) {
  const [matchList, setMatchList] = useState([]);

  // 처음 목록 받아오기
  useEffect(() => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/match/schedule`,
      data: userinfo,
    })
      .then((res) => {
        setMatchList(
          res.data.map((r) => {
            if (r.profileURL) {
              r.profileURL =
                process.env.REACT_APP_S3_BASE_URL + "/" + r.profileURL;
            }
            if (r.awayprofileURL) {
              r.awayprofileURL =
                process.env.REACT_APP_S3_BASE_URL + "/" + r.awayprofileURL;
            }
            return r;
          })
        );
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  return (
    <div style={{ height: "750px", overflow: "auto" }}>
      <List>
        {matchList.length === 0 ? (
          <div>
            <h3 style={{ textAlign: "center" }}>예정된 매치가 없습니다.</h3>
          </div>
        ) : (
          matchList.map((ml) => (
            <ListItem>
              <ListItemAvatar>
                {ml.profileURL ? (
                  <img
                    src={ml.profileURL}
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
                  textAlign: "center",
                  width: "10%",
                }}
              >
                <Link
                  to={"/teaminfo/" + ml.homeTeamID}
                  style={{ color: "black" }}
                >
                  {ml.hometeam}
                </Link>
              </ListItemText>
              <ListItemText
                primary={`${ml.date} / ${ml.time}시`}
                secondary={`${ml.sido} ${ml.gu} ${ml.name}`}
                style={{ textAlign: "center", width: "40%" }}
              />
              <ListItemText
                style={{
                  textAlign: "center",
                  width: "20%",
                }}
              >
                <Link
                  to={"/teaminfo/" + ml.awayTeamID}
                  style={{ color: "black" }}
                >
                  {ml.awayteam}
                </Link>
              </ListItemText>
              <ListItemAvatar>
                {ml.awayprofileURL ? (
                  <img
                    src={ml.awayprofileURL}
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
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
}
