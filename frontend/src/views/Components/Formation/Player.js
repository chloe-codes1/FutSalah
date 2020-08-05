import React from "react";
import { useDrag } from "react-dnd";

const playerStyle = {
  padding: 0,
  margin: "auto",
  fontSize: 20,
  fontWeight: "bold",
  cursor: "pointer",
  textAlign: "center",
  height: "90%",
  borderRadius: "70%",
  backgroundColor: "darkblue",
};
export const Player = ({ player }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "position", player },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (monitor) => ({}),
  });
  return (
    <>
      <div
        ref={drag}
        style={{
          ...playerStyle,
          opacity: isDragging ? 0.5 : 1,
          width: player.idx === 0 ? "18%" : "90%",
        }}
      >
        {player.position}
        <br />
        {player.name}
      </div>
    </>
  );
};
