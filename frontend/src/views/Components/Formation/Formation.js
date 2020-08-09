import React from "react";
import { FormationBoard } from "./FormationBoard";
import { FormationSquare } from "./FormationSquare";
import { Player } from "./Player";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/FormationStyle.js";

const useStyles = makeStyles(styles);

export default function Formation({ playerPos, setPlayerPos, memberNum }) {
  const classes = useStyles();
  const movePlayer = (goalIdx, player) => {
    for (let i = 0; i < playerPos.length; i++) {
      if (player.idx === playerPos[i].idx) {
        // i번째 선수의 idx를 goalIdx로 변경
        const nextPlayerPos = [...playerPos];

        nextPlayerPos[i] = {
          ...playerPos[i],
          idx: goalIdx,
        };
        setPlayerPos(nextPlayerPos);
        return;
      }
    }
    if (
      playerPos.find((element) => element.userid === player.userid) ===
        undefined &&
      playerPos.length < memberNum
    )
      setPlayerPos([...playerPos, Object.assign(player, { idx: goalIdx })]);
  };

  const canMove = (idx) => {
    for (let i = 0; i < playerPos.length; i++) {
      if (idx === playerPos[i].idx) return false;
    }
    return true;
  };

  const renderPiece = (idx) => {
    for (let i = 0; i < playerPos.length; i++) {
      if (playerPos[i].idx === idx) {
        return <Player player={playerPos[i]} inField />;
      }
    }
    return null;
  };
  return (
    <div className={classes.formation}>
      <div
        style={{
          width: "100%",
          height: "83%",
        }}
      >
        <FormationBoard
          canMove={canMove}
          movePlayer={movePlayer}
          renderPiece={renderPiece}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "17%",
        }}
      >
        <FormationSquare canMove={canMove} movePlayer={movePlayer} posNum={0}>
          {renderPiece(0)}
        </FormationSquare>
      </div>
    </div>
  );
}
