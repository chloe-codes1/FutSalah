import React from "react";
import { useDrop } from "react-dnd";
import { Overlay } from "./Overlay";

import benchImg from "assets/img/bench.PNG";

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
        backgroundImage: `url(${benchImg})`,
        backgroundSize: "100% 100%",
      }}
    >
      <div
        style={{
          fontSize: 18,
          width: "100%",
          height: "100%",
          textAlign: "center",
          backgroundColor: "rgba(0 0 0 0.5)",
        }}
      ></div>
      {isOver && <Overlay color="crimson" />}
    </div>
  );
};
