import React, { useState } from "react";

export const Square = () => {
  const [squareValue, setSquareValue] = useState("");

  const handleClick = () => {
    if (squareValue === "") {
      setSquareValue("X");
    }
  };
  return (
    <td className="square" onClick={handleClick}>
      {squareValue}
    </td>
  );
};

export default Square;
