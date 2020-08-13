import React from "react";
import { FormationBoard } from "./FormationBoard";
import { FormationSquare } from "./FormationSquare";
import { Player } from "./Player";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/FormationStyle.js";

const useStyles = makeStyles(styles);

export default function Formation({
  playerPos,
  setPlayerPos,
  memberNum,
  movable,
}) {
  const classes = useStyles();
  const movePlayer = (goalGrid, player) => {
    for (let i = 0; i < playerPos.length; i++) {
      if (player.grid === playerPos[i].grid) {
        // i번째 선수의 grid goalGrid로 변경
        const nextPlayerPos = [...playerPos];

        nextPlayerPos[i] = {
          ...playerPos[i],
          grid: goalGrid,
        };
        setPlayerPos(nextPlayerPos);
        return;
      }
    }
    if (
      playerPos.find((element) => element.userID === player.userID) ===
        undefined &&
      playerPos.length < memberNum
    )
      setPlayerPos([...playerPos, Object.assign(player, { grid: goalGrid })]);
  };

  const canMove = (grid) => {
    for (let i = 0; i < playerPos.length; i++) {
      if (grid === playerPos[i].grid) return false;
    }
    return true;
  };

  const renderPiece = (grid, movable) => {
    for (let i = 0; i < playerPos.length; i++) {
      if (playerPos[i].grid === grid) {
        return <Player movable={movable} player={playerPos[i]} inField />;
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
          movable={movable}
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
        <FormationSquare
          movable={movable}
          canMove={canMove}
          movePlayer={movePlayer}
          posNum={0}
        >
          {renderPiece(0, movable)}
        </FormationSquare>
      </div>
    </div>
  );
}
