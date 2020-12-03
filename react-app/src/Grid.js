import React, { useState } from "react";
import { Square } from "./Square";

export const Grid = () => {
  const [turn, setTurn] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [title, setTitle] = useState("Choose Type of Game");
  const [game, setGame] = useState("");

  const handleClick = (squareIndex) => {
    if (turn === "ended" || game === "") {
      return;
    }
    if (squares[squareIndex] === "") {
      let squaresCopy = squares;
      squaresCopy[squareIndex] = turn;
      if (turn === "X") {
        setTurn("O");
        setTitle("Next Player: O");
      } else {
        setTurn("X");
        setTitle("Next Player: X");
      }
      setSquares(squaresCopy);
    }
    if (declareWinner(squareIndex)) {
      setTitle("WINNER: " + turn);
      setTurn("ended");
      return;
    }
    if (declareTie()) {
      setTitle("IT'S A TIE");
      setTurn("ended");
    }
  };
  const declareTie = () => {
    const condition = (value) => value !== "";
    if (squares.every(condition)) {
      return true;
    }
    return false;
  };
  const declareWinner = (i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const firstOfRow = row * 3;
    const isInDiagonal = i % 2 === 0 ? true : false;
    if (
      squares[firstOfRow] === squares[firstOfRow + 1] &&
      squares[firstOfRow + 2] === squares[firstOfRow + 1]
    ) {
      return true;
    }
    if (
      squares[col] === squares[col + 3] &&
      squares[col + 6] === squares[col + 3]
    ) {
      return true;
    }
    if (isInDiagonal) {
      if (i % 4 === 0) {
        if (squares[0] === squares[4] && squares[4] === squares[8]) {
          return true;
        }
      } else {
        if (squares[2] === squares[4] && squares[4] === squares[6]) {
          return true;
        }
      }
    }
    return false;
  };
  return (
    <table className="grid">
      <h1>{title}</h1>
      <div>
        <button>Reset</button>
        <button
          onClick={() => {
            setGame("PvP");
            setTitle("Next Player: X");
          }}
        >
          Person vs Person
        </button>
        <button
          onClick={() => {
            setGame("PvC");
            setTitle("Next Player: X");
          }}
        >
          Person vs Computer
        </button>
      </div>

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
