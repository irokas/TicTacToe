import React from "react";

export const Square = (props) => {
  return (
    <td className="square" onClick={props.onClick}>
      {props.value}
    </td>
  );
};

export default Square;
