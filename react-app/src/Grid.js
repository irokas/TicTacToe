import React, { useState } from "react";
import { Square } from "./Square";

export const findEmptyCells = (squares) => {
  let emptyCells = [];
  squares.map((square, index) => {
    if (square === "") {
      emptyCells.push(index);
    }
    return index;
  });
  return emptyCells;
};
export const declareTie = (squares) => {
  if (findEmptyCells(squares).length === 0) {
    return true;
  }
  return false;
};
export const declareWinner = (squares) => {
  if (
    squares[0] === squares[1] &&
    squares[1] === squares[2] &&
    squares[0] !== ""
  ) {
    return squares[0];
  }
  if (
    squares[3] === squares[4] &&
    squares[3] === squares[5] &&
    squares[3] !== ""
  ) {
    return squares[3];
  }
  if (
    squares[6] === squares[7] &&
    squares[6] === squares[8] &&
    squares[6] !== ""
  ) {
    return squares[6];
  }
  if (
    squares[0] === squares[3] &&
    squares[0] === squares[6] &&
    squares[0] !== ""
  ) {
    return squares[0];
  }
  if (
    squares[1] === squares[4] &&
    squares[1] === squares[7] &&
    squares[1] !== ""
  ) {
    return squares[1];
  }
  if (
    squares[2] === squares[5] &&
    squares[2] === squares[8] &&
    squares[2] !== ""
  ) {
    return squares[2];
  }
  if (
    squares[0] === squares[4] &&
    squares[0] === squares[8] &&
    squares[0] !== ""
  ) {
    return squares[0];
  }
  if (
    squares[2] === squares[4] &&
    squares[2] === squares[6] &&
    squares[2] !== ""
  ) {
    return squares[2];
  }
  return "";
};
const minimax = (isCPUturn, board, depth) => {
  let newBoard = board.slice();
  const emptyCells = findEmptyCells(board);
  const winner = declareWinner(board);
  if (winner === "X") {
    return -1;
  }
  if (winner === "O") {
    return 1 / depth;
  }
  if (declareTie(board)) {
    return 0;
  }
  let scores = [];
  const nextTurn = isCPUturn ? "O" : "X";
  for (let i = 0; i < emptyCells.length; i++) {
    newBoard[emptyCells[i]] = nextTurn;
    const score = minimax(!isCPUturn, newBoard, depth + 1);
    scores.push(score);
    if (isCPUturn) {
      if (score > 0) {
        break;
      }
    } else if (score < 0) {
      break;
    }
    newBoard[emptyCells[i]] = "";
  }
  if (isCPUturn) {
    return Math.max(...scores);
  }
  return Math.min(...scores);
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
    squares[squareIndex] = mark;
    if (turn === "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
    const next = mark === "X" ? "O" : "X";
    setTitle(`Next Player: ${next}`);

    if (declareWinner(squares) !== "") {
      setTitle("WINNER: " + mark);
      setEnded(true);
      return false;
    }
    if (declareTie(squares)) {
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
      } else if (markCell(squareIndex, turn) === false) {
        return;
      }
    } else {
      return;
    }
    if (game === "PvC") {
      computerMove();
    }
  };

  const makeBestMove = () => {
    let bestScore = -2;
    let bestMove = -1;
    let newBoard = squares.slice();
    const emptyCells = findEmptyCells(squares);
    for (let i = 0; i < emptyCells.length; i++) {
      newBoard[emptyCells[i]] = "O";
      const score = minimax(false, newBoard, 0);
      newBoard[emptyCells[i]] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = emptyCells[i];
      }
    }
    markCell(bestMove, "O");
  };
  const computerMove = () => {
    if (ended === true) {
      return;
    }

    setTimeout(makeBestMove, 200);
  };

  const gameChange = (newGame, newTurn, newTitle) => {
    setSquares(Array(9).fill(""));
    setGame(newGame);
    setTurn(newTurn);
    setTitle(newTitle);
    setEnded(false);
  };
  return (
    <table className="grid">
      <h1 id="title">{title}</h1>
      <div>
        <button
          id="reset"
          onClick={() => gameChange("", "", "Choose Type of Game")}
        >
          Reset
        </button>
        <button
          id="PvP"
          onClick={() => gameChange("PvP", "X", "Next Player: X")}
        >
          Person vs Person
        </button>
        <button
          id="PvC"
          onClick={() => gameChange("PvC", "X", "Next Player: X")}
        >
          Person vs Computer
        </button>
      </div>

      <th>
        {[0, 1, 2].map((key) => {
          return (
            <Square
              onClick={() => handleClick(key)}
              turn={squares[key]}
              key={key}
            />
          );
        })}
      </th>
      <th>
        {[3, 4, 5].map((key) => {
          return (
            <Square
              onClick={() => handleClick(key)}
              turn={squares[key]}
              key={key}
            />
          );
        })}
      </th>
      <th>
        {[6, 7, 8].map((key) => {
          return (
            <Square
              onClick={() => handleClick(key)}
              turn={squares[key]}
              key={key}
            />
          );
        })}
      </th>
    </table>
  );
};

export default Grid;
