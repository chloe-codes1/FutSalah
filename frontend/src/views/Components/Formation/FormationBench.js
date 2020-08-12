import React from "react";
import { useDrop } from "react-dnd";
import { Overlay } from "./Overlay";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
        backgroundColor: "transparent",
        backgroundImage: `url(${benchImg})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isOver && <Overlay color="crimson" />}
    </div>
  );
};
