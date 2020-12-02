import React, { useState } from "react";

export const Square = (props) => {
  return (
    <td className="square" onClick={props.onClick}>
      {props.turn}
    </td>
  );
};

export default Square;
