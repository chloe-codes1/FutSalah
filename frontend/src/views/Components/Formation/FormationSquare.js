import React from "react";
import { useDrop } from "react-dnd";
// import { Square } from './Square'
// import { canMoveKnight, moveKnight } from './Game'
// import { ItemTypes } from './ItemTypes'
import { Overlay } from "./Overlay";

export const FormationSquare = ({ children }) => {
  //   const [{ isOver, canDrop }, drop] = useDrop({
  const [{ isOver }, drop] = useDrop({
    accept: "position",
    // canDrop: () => canMoveKnight(x, y),
    // drop: () => [{ idx: 0 }, { idx: 5 }, { idx: 6 }],
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      //   canDrop: !!monitor.canDrop(),
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
          color: "white",
          backgroundColor: "green",
        }}
      >
        {children}
      </div>
      {isOver && <Overlay color="white" />}
      {/* {!isOver && <Overlay color="yellow" />} */}
      {/* {isOver && canDrop && <Overlay color="green" />} */}
    </div>
  );
};
