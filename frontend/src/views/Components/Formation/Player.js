import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import playerPreview from "assets/img/playerPreview.png";

import makeStyles from "@material-ui/core/styles/makeStyles";

import shrit from "assets/img/shirt.png";

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
  return inField ? (
    <>
      <div
        ref={movable ? drag : null}
        className={classes.player}
        style={{
          opacity: isDragging ? 0.5 : 1,
          width: player.grid === 0 ? "18%" : "90%",
          textAlign: "center",
        }}
      >
        <img
          src={shrit}
          style={{
            width: "70%",
          }}
        />
        <div className={classes.name}>{player.name}</div>
      </div>
    </>
  ) : (
    <>
      <DragPreviewImage connect={preview} src={playerPreview} />
      <div
        ref={movable ? drag : null}
        className={classes.player}
        style={{
          backgroundColor: "#edf2f4",
        }}
      >
        {children}
      </div>
    </>
  );
};
