import React, { useState } from "react";
import { Square } from "./Square";

const findEmptyCells = (squares) => {
  let emptyCells = [];
  squares.map((square, index) => {
    if (square === "") {
      emptyCells.push(index);
    }
    return index;
  });
  return emptyCells;
};

export const Grid = () => {
  const [turn, setTurn] = useState("");
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [title, setTitle] = useState("Choose Type of Game");
  const [game, setGame] = useState("");
  const [ended, setEnded] = useState(false);

  const markCell = (squareIndex, mark) => {
    if (ended === true || game === "") {
      return false;
    }
    let squaresCopy = squares;
    squaresCopy[squareIndex] = mark;
    if (turn === "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
    const next = mark === "X" ? "O" : "X";
    setTitle(`Next Player: ${next}`);

    setSquares(squaresCopy);

    if (declareWinner(squareIndex)) {
      setTitle("WINNER: " + mark);
      setEnded(true);
      return false;
    }
    if (declareTie()) {
      setTitle("IT'S A TIE");
      setEnded(true);
      return false;
    }
  };
  const handleClick = (squareIndex) => {
    if (ended === true || turn === "") {
      return;
    }
    if (squares[squareIndex] === "") {
      if (game === "PvC") {
        if (markCell(squareIndex, "X") === false) {
          return;
        }
      } else {
        if (markCell(squareIndex, turn) === false) {
          return;
        }
      }
    } else {
      return;
    }
    if (game === "PvC") {
      computerMove();
    }
  };
  const computerMove = () => {
    if (ended === true) {
      return;
    }
    const emptyCells = findEmptyCells(squares);
    const randomCell = Math.floor(Math.random() * emptyCells.length);
    const squareIndex = emptyCells[randomCell];
    setTimeout(() => markCell(squareIndex, "O"), 500);
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
  const gameChange = (newGame) => {
    setSquares(Array(9).fill(""));
    setGame(newGame);
    setTurn("X");
    setTitle("Next Player: X");
    setEnded(false);
  };
  return (
    <table className="grid">
      <h1 id="title">{title}</h1>
      <div>
        <button
          id="reset"
          onClick={() => {
            setSquares(Array(9).fill(""));
            setTitle("Choose Type of Game");
            setGame("");
            setEnded(false);
          }}
        >
          Reset
        </button>
        <button id="PvP" onClick={() => gameChange("PvP")}>
          Person vs Person
        </button>
        <button id="PvC" onClick={() => gameChange("PvC")}>
          Person vs Computer
        </button>
      </div>

      <th>
        {[0, 1, 2].map((key) => {
          return (
            <Square onClick={() => handleClick(key)} turn={squares[key]} />
          );
        })}
      </th>
      <th>
        {[3, 4, 5].map((key) => {
          return (
            <Square onClick={() => handleClick(key)} turn={squares[key]} />
          );
        })}
      </th>
      <th>
        {[6, 7, 8].map((key) => {
          return (
            <Square onClick={() => handleClick(key)} turn={squares[key]} />
          );
        })}
      </th>
    </table>
  );
};

export default Grid;
