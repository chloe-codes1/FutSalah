import React from "react";
import { useDrop } from "react-dnd";
import { Overlay } from "./Overlay";

export const FormationSquare = ({ canMove, movePlayer, posNum, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "position",
    canDrop: () => canMove(posNum),
    drop: (item) => movePlayer(posNum, item.player),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
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
        {children}
      </div>
      {isOver && canDrop && <Overlay color="skyblue" />}
      {isOver && !canDrop && <Overlay color="darkred" />}
      {!isOver && canDrop && <Overlay color="white" />}
    </div>
  );
};
