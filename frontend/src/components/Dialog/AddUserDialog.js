import { Dialog, DialogTitle, TextField } from "@material-ui/core";
import React, { useState } from "react";

import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";

function AddInfoDialog(props) {
  const { open, onClose, modifyTeamList, teamID } = props;

  const [searchWord, setSearchWord] = useState("");
  const [serachTeamList, setSerachTeamList] = useState([]);

  const handleClose = () => {
    onClose();
  };

  // 멤버 추가
  const addMember = (userInfo, teamID) => {
    const userTeamConn = {
      userID: userInfo.userID,
      teamID,
    };
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/crew`,
      data: userTeamConn,
    })
      .then(() => {
        if (userInfo.profileURL) {
          userInfo.profileURL =
            process.env.REACT_APP_S3_BASE_URL + "/" + userInfo.profileURL;
        }
        modifyTeamList(userInfo);
        alert(userInfo.name + "님이 성공적으로 추가되었습니다.");
      })
      .catch((e) => {
        console.log("error", e);
      });
    handleClose();
    setSerachTeamList([]);
  };

  // 이름으로 멤버 찾기
  const searchUser = (name) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/user/` + name,
    })
      .then((res) => {
        const searchList = res.data;
        axios({
          method: "get",
          url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/member/${teamID}`,
        })
          .then((res) => {
            setSerachTeamList(
              searchList.filter(
                (sl) =>
                  res.data.find((data) => data.userID === sl.userID) ===
                  undefined
              )
            );
          })
          .catch(() => {
            console.log("으악으악!");
          });
      })
      .catch(() => {
        console.log("으악!");
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ backgroundColor: "#edf2f4" }}>
        팀원 추가
      </DialogTitle>
      <List style={{ backgroundColor: "#edf2f4" }}>
        <ListItem>
          <input
            type="text"
            style={{ lineHeight: "30px" }}
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
          <Button
            color="teamInfo"
            size="sm"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              searchUser(searchWord);
            }}
          >
            검색
          </Button>
        </ListItem>
        <ListItem>
          <TableContainer>
            <Table>
              <TableBody>
                {serachTeamList.map((list) => {
                  // setChecked(checked.concat(false));
                  return (
                    <TableRow>
                      <TableCell>{list.name}</TableCell>
                      <TableCell>{list.email}</TableCell>
                      <TableCell>{list.position}</TableCell>
                      <TableCell>
                        <Button
                          color="teamInfo2"
                          onClick={() => {
                            addMember(list, teamID);
                          }}
                        >
                          추가
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
        <ListItem>
          <Button color="teamInfo3" onClick={handleClose}>
            나가기
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default AddInfoDialog;
