import React, { useState } from "react";
import { Square } from "./Square";

export const Grid = () => {
  const [turn, setTurn] = useState("");
  const [squares, setSquares] = useState(Array(9).fill(""));
  const handleClick = (squareIndex) => {
    if (squares[squareIndex] === "") {
      let squaresCopy = squares;
      squaresCopy[squareIndex] = turn;
      if (turn === "X") {
        setTurn("O");
      } else {
        setTurn("X");
      }
      setSquares(squaresCopy);
    }
  };
  return (
    <table className="grid">
      <th>
        <Square onClick={() => handleClick(0)} turn={squares[0]} />
        <Square onClick={() => handleClick(1)} turn={squares[1]} />
        <Square onClick={() => handleClick(2)} turn={squares[2]} />
      </th>
      <th>
        <Square onClick={() => handleClick(3)} turn={squares[3]} />
        <Square onClick={() => handleClick(4)} turn={squares[4]} />
        <Square onClick={() => handleClick(5)} turn={squares[5]} />
      </th>
      <th>
        <Square onClick={() => handleClick(6)} turn={squares[6]} />
        <Square onClick={() => handleClick(7)} turn={squares[7]} />
        <Square onClick={() => handleClick(8)} turn={squares[8]} />
      </th>
    </table>
  );
};

export default Grid;
