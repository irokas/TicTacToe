import React, { useState } from "react";
import { Square } from "./Square";

export const findEmptyCells = (squares) => {
  const reducer = (accumulator, currentValue, currentIndex) => {
    if (currentValue === "") {
      accumulator.push(currentIndex);
    }

    return accumulator;
  };

  return squares.reduce(reducer, []);
};

export const declareTie = (squares) => {
  return findEmptyCells(squares).length === 0;
};

export const declareWinner = (squares) => {
  // first row
  if (
    squares[0] === squares[1] &&
    squares[1] === squares[2] &&
    squares[0] !== ""
  ) {
    return squares[0];
  }
  // second row
  if (
    squares[3] === squares[4] &&
    squares[3] === squares[5] &&
    squares[3] !== ""
  ) {
    return squares[3];
  }
  // third row
  if (
    squares[6] === squares[7] &&
    squares[6] === squares[8] &&
    squares[6] !== ""
  ) {
    return squares[6];
  }
  // first column
  if (
    squares[0] === squares[3] &&
    squares[0] === squares[6] &&
    squares[0] !== ""
  ) {
    return squares[0];
  }
  // second column
  if (
    squares[1] === squares[4] &&
    squares[1] === squares[7] &&
    squares[1] !== ""
  ) {
    return squares[1];
  }
  // third column
  if (
    squares[2] === squares[5] &&
    squares[2] === squares[8] &&
    squares[2] !== ""
  ) {
    return squares[2];
  }
  // first diagonal
  if (
    squares[0] === squares[4] &&
    squares[0] === squares[8] &&
    squares[0] !== ""
  ) {
    return squares[0];
  }
  // second diagonal
  if (
    squares[2] === squares[4] &&
    squares[2] === squares[6] &&
    squares[2] !== ""
  ) {
    return squares[2];
  }

  return "";
};

export const minimax = (isCPUturn, board, depth, alpha, beta) => {
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
  for (let i = 0; i < emptyCells.length; i += 1) {
    newBoard[emptyCells[i]] = nextTurn;
    const score = minimax(!isCPUturn, newBoard, depth + 1, alpha, beta);
    scores.push(score);
    newBoard[emptyCells[i]] = "";
    if (isCPUturn) {
      if (score > alpha) {
        alpha = score;
      }
    } else if (score < beta) {
      beta = score;
    }
    if (alpha >= beta) {
      break;
    }
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
    if (ended || game === "") {
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
      setTitle(`WINNER: ${mark}`);
      setEnded(true);

      return false;
    }
    if (declareTie(squares)) {
      setTitle("IT'S A TIE");
      setEnded(true);

      return false;
    }

    return true;
  };

  const handleClick = (squareIndex) => {
    if (ended || turn === "") {
      return;
    }
    if (squares[squareIndex] === "") {
      if (game === "PvC") {
        if (!markCell(squareIndex, "X")) {
          return;
        }
      } else if (!markCell(squareIndex, turn)) {
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
    let bestScore = -Infinity;
    let bestMove;
    let newBoard = squares.slice();

    const emptyCells = findEmptyCells(squares);

    for (let i = 0; i < emptyCells.length; i += 1) {
      newBoard[emptyCells[i]] = "O";
      const score = minimax(false, newBoard, 0, -Infinity, Infinity);
      newBoard[emptyCells[i]] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = emptyCells[i];
      }
    }
    markCell(bestMove, "O");
  };

  const computerMove = () => {
    if (ended) {
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
