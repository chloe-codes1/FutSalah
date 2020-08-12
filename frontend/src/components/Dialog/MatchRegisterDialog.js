import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Select } from "@material-ui/core";

function MatchRegisterDialog({ open, onClose, info, area }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <img src={require("assets/img/match_register.jpg")} />
        <DialogTitle>매칭 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>원하는 매칭이 없으신가요? 직접 매칭을 등록해보세요!</DialogContentText>
          <Typography variant="subtitle2" gutterBottom>
            지역 : {area}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            일시 : {info.date.getFullYear()}년 {info.date.getMonth() + 1}월 {info.date.getDate()}일{" "}
            {info.time}시
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            경기방식 : {info.type}인 팀 매치
          </Typography>
          {info.isBook === "0" && <Typography variant="body1">경기장 : 미정</Typography>}
          {info.isBook === "1" && (
            <>
              <Typography variant="body1">경기장 : 미정</Typography>
              <Select>경기장선택</Select>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MatchRegisterDialog;
