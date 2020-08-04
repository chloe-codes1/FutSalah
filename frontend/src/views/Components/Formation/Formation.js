import React, { useState, useCallback } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";
import update from "immutability-helper";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

export default function Formation(props) {
  const ItemTypes = {
    FOOD: "food",
    GLASS: "glass",
    PAPER: "paper",
  };

  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
      lastDroppedItem: null,
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
  ]);

  // 포메이션 위치
  const [formPos, setFormPos] = useState([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [0],
  ]);

  const [boxes] = useState([
    { name: "Bottle", type: ItemTypes.GLASS },
    { name: "Banana", type: ItemTypes.FOOD },
    { name: "Magazine", type: ItemTypes.PAPER },
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [droppedBoxNames, dustbins]
  );
  return (
    <GridContainer
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      style={{
        width: "100%",
      }}
    >
      {formPos.map((fp) => (
        <GridContainer
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          style={{
            width: "100%",
          }}
        >
          {fp.map((f, index) => {
            let fpmd = 2;
            if (f === 0) {
              fpmd = 12;
            }
            return (
              <GridItem md={fpmd}>
                {/* <Dustbin
                  onDrop={(item) => handleDrop(index, item)}
                  key={index}
                /> */}
                aa
              </GridItem>
            );
          })}
        </GridContainer>
      ))}
      {/* {dustbins.map(({ accepts, lastDroppedItem }, index) => (
        <Dustbin
          accept={accepts}
          lastDroppedItem={lastDroppedItem}
          onDrop={(item) => handleDrop(index, item)}
          key={index}
        />
      ))} */}
    </GridContainer>
  );
}
