import React, { useState, useCallback } from "react";
import { FormationBoard } from "./FormationBoard";
import { FormationSquare } from "./FormationSquare";
import { Player } from "./Player";
import image from "assets/img/backgroundFormation.jpg";

export default function Formation({ playerPos, setPlayerPos, memberNum }) {
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
    <div
      style={{
        margin: "0 auto",
        width: "30vw",
        height: "36vw",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundColor: "green",
        // border: "2px solid white",
      }}
    >
      <div
        style={{
          margin: "0 auto",
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
