import React, { useReducer, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  Avatar,
} from "@material-ui/core";

import axios from "axios";
//import logo from "../../assets/img/examples/teamlogo.png";

const initialState = {
  team: {
    socialID: "",
    description: "",
    code: "",
    name: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        team: {
          ...state.team,
          [action.name]: action.value,
        },
      };

    default:
      return state;
  }
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  listRoot: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: theme.palette.background.paper,
  },
}));

function CreateTeamDialog({ open, onClose, idData, refreshTeam }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { team } = state;
  const classes = useStyles();
  team.socialID = idData;
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const createTeam = useCallback(() => {
    axios({
      method: "post",
      url: "http://localhost:9999/api/team",
      data: team,
    })
      .then(() => {
        console.log("team create success!");
        alert("팀 생성 완료!");
        onClose();
        refreshTeam();
      })
      .catch(() => {
        console.log("team create fail!");
        alert("팀 생성 실패-잠시후 다시 시도해주세요");
        onClose();
      });
  });

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>팀 생성하기</DialogTitle>
      <Grid container justify="center">
        <Grid item>
          <Avatar className={classes.large}>TeamLogo</Avatar>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={7}>
          <List className={classes.listRoot}>
            <ListItem>
              <TextField
                name="name"
                fullWidth
                label="팀명"
                onChange={onChange}
              />
            </ListItem>
            <ListItem>
              <TextField
                name="code"
                fullWidth
                label="지역"
                onChange={onChange}
              />
            </ListItem>
            <ListItem>
              <TextField
                name="description"
                fullWidth
                label="팀소개"
                onChange={onChange}
              />
            </ListItem>
          </List>
          {/* <TextField fullWidth label="지역" /> */}
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Grid container justify="center">
        <List>
          <ListItem>
            <Button variant="contained" color="primary" onClick={createTeam}>
              생성
            </Button>
          </ListItem>
        </List>
      </Grid>
    </Dialog>
  );
}

export default CreateTeamDialog;
