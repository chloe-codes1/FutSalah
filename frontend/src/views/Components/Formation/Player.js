import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import playerPreview from "assets/img/playerPreview.png";

import makeStyles from "@material-ui/core/styles/makeStyles";

import styles from "assets/jss/material-kit-react/views/componentsSections/PlayerStyle.js";

const useStyles = makeStyles(styles);

export const Player = ({ player, inField, children, movable }) => {
  const classes = useStyles();
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "position", player },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // 포지션에 따라 배경색 정해짐
  const selectBGcolor = (pos) => {
    switch (pos) {
      case "all":
        return classes.all;
      case "pivo":
        return classes.pivo;
      case "ala":
        return classes.ala;
      case "fixo":
        return classes.fixo;
      case "goleiro":
        return classes.goleiro;
      case "":
        return classes.noPosition;
      default:
        return classes.player;
    }
  };
  return inField ? (
    <>
      <div
        ref={movable ? drag : null}
        className={selectBGcolor(player.position)}
        style={{
          textAlign: "center",
          height: "90%",
          borderRadius: "70%",
          opacity: isDragging ? 0.5 : 1,
          width: player.idx === 0 ? "18%" : "90%",
        }}
      >
        {player.position !== "" ? (
          <div>{player.position}</div>
        ) : (
          <div>
            <br />
          </div>
        )}
        <div style={{ fontSize: 15, fontWeight: 900 }}>{player.name}</div>
      </div>
    </>
  ) : (
    <>
      <DragPreviewImage connect={preview} src={playerPreview} />
      <div ref={movable ? drag : null} className={classes.player}>
        {children}
      </div>
    </>
  );
};
