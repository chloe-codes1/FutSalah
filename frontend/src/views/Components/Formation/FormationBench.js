import React from "react";
import { useDrop } from "react-dnd";
import { Overlay } from "./Overlay";

export const FormationBench = ({ removePlayer }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "position",
    drop: (item) => removePlayer(item.player.idx),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "gray",
      }}
    >
      <div
        style={{
          fontSize: 18,
          width: "100%",
          height: "100%",
          textAlign: "center",
        }}
      >
        <strong>벤치</strong>
        <br />
        <span style={{ fontSize: 5 }}>선수를 빼려면 여기에 드롭</span>
      </div>
      {isOver && <Overlay color="crimson" />}
    </div>
  );
};
