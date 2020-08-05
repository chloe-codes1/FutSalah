import React, { useState, useCallback } from "react";
import { FormationBoard } from "./FormationBoard";
import { FormationSquare } from "./FormationSquare";
import { Player } from "./Player";

export default function Formation(props) {
  // 포메이션 위치
  const [playerPos, setPlayerPos] = useState([
    {
      idx: 7,
      name: "김싸피",
      position: "ALA",
    },
    {
      idx: 0,
      name: "박철수",
      position: "GOLERIO",
    },
  ]);

  const renderPiece = (idx) => {
    for (let i = 0; i < playerPos.length; i++) {
      if (playerPos[i].idx === idx) {
        return <Player player={playerPos[i]} />;
      }
    }
    return null;
  };
  return (
    <div
      style={{
        margin: "0 auto",
        width: "90%",
        height: "405px",
        // border: "1px solid gray",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          width: "100%",
          height: "80%",
        }}
      >
        <FormationBoard renderPiece={renderPiece} />
      </div>
      <div
        style={{
          width: "100%",
          height: "20%",
        }}
      >
        <FormationSquare>{renderPiece(0)}</FormationSquare>
      </div>
    </div>
  );
}
