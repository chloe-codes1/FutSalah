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
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <strong>벤치</strong>
      </div>
      {isOver && <Overlay color="darkred" />}
      {!isOver && <Overlay color="white" />}
    </div>
  );
};
