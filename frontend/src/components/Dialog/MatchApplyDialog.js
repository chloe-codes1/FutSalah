import React from "react";
import Button from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

function MatchApplyDialog({ open, onClose, info }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>매치 상세정보</DialogTitle>
        <DialogContent>
          <DialogContentText>경기방식 : {info.formCode}인 팀 매치</DialogContentText>
          <DialogContentText>경기일시 : {info.date}</DialogContentText>
          <DialogContentText>지역 : {info.gu}</DialogContentText>
          {info.isBooked === 1 && <DialogContentText>경기장 : {info.name}</DialogContentText>}
          {info.isBooked === 0 && <DialogContentText>경기장 : 미정</DialogContentText>}
          <Grid container justify="center">
            <Grid item>
              <Typography></Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MatchApplyDialog;
