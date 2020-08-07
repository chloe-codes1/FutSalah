import React from "react";
import { useDrag } from "react-dnd";

const playerStyle = {
  padding: 0,
  margin: "auto",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: "bold",
};

export const Player = ({ player, inField }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "position", player },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return inField ? (
    <div
      ref={drag}
      style={{
        ...playerStyle,
        textAlign: "center",
        height: "90%",
        borderRadius: "70%",
        backgroundColor: "darkblue",
        opacity: isDragging ? 0.5 : 1,
        width: player.idx === 0 ? "18%" : "90%",
      }}
    >
      {player.position}
      <br />
      {player.name}
    </div>
  ) : (
    <div
      ref={drag}
      style={{
        ...playerStyle,
      }}
    >
      {player.name}
    </div>
  );
};
