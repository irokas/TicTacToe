import React, { useState } from "react";
import { Square } from "./Square";

export const Grid = () => {
  const [turn, setTurn] = useState("");
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [title, setTitle] = useState("Choose Type of Game");
  const [game, setGame] = useState("");

  const markCell = (squareIndex, mark) => {
    if (turn === "ended" || game === "") {
      return "end";
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
      setTurn("ended");
      return "end";
    }
    if (declareTie()) {
      setTitle("IT'S A TIE");
      setTurn("ended");
      return "end";
    }
  };
  const handleClick = (squareIndex) => {
    if (turn === "ended" || turn === "") {
      return;
    }
    if (squares[squareIndex] === "") {
      if (game === "PvC") {
        if (markCell(squareIndex, "X") === "end") {
          return;
        }
      } else {
        if (markCell(squareIndex, turn) === "end") {
          return;
        }
      }
    }
    if (game === "PvC") {
      computerMove();
    }
  };
  const computerMove = () => {
    if (turn === "ended") {
      return;
    }
    const emptyCells = findEmptyCells();
    const randomCell = Math.floor(Math.random() * emptyCells.length);
    const squareIndex = emptyCells[randomCell];
    markCell(squareIndex, "O");
  };
  const findEmptyCells = () => {
    let emptyCells = [];
    squares.map((square, index) => {
      if (square === "") {
        emptyCells.push(index);
      }
      return index;
    });
    return emptyCells;
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
      <h1 id="title">{title}</h1>
      <div>
        <button
          id="reset"
          onClick={() => {
            setSquares(Array(9).fill(""));
            setTitle("Choose Type of Game");
          }}
        >
          Reset
        </button>
        <button
          id="PvP"
          onClick={() => {
            setGame("PvP");
            setTurn("X");
            setTitle("Next Player: X");
          }}
        >
          Person vs Person
        </button>
        <button
          id="PvC"
          onClick={() => {
            setGame("PvC");
            setTurn("X");
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
