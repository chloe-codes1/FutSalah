import React from "react";
import { useDrag } from "react-dnd";

const playerStyle = {
  margin: "auto",
  fontSize: 20,
  fontWeight: "bold",
  cursor: "pointer",
  textAlign: "center",
  height: "100%",
  borderRadius: "70%",
  backgroundColor: "darkblue",
};
export const Player = ({ player }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "position" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <>
      <div
        ref={drag}
        style={{
          ...playerStyle,
          opacity: isDragging ? 0.5 : 1,
          width: player.idx === 0 ? "20%" : "100%",
        }}
      >
        {player.name}
        <br />
        {player.position}
      </div>
    </>
  );
};
