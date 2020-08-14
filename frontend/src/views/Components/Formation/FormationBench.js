import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Overlay } from "./Overlay";
import React from "react";
import benchImg from "assets/img/bench.png";
import { useDrop } from "react-dnd";

export const FormationBench = ({ removePlayer }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "position",
    drop: (item) => removePlayer(item.player.grid),
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
