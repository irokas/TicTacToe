import React, { useState, useEffect } from "react";
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

export const checkWinner = (squares) => {
  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < 8; i += 1) {
    let combination = winnerCombinations[i];
    if (
      squares[combination[0]] === squares[combination[1]] &&
      squares[combination[1]] === squares[combination[2]] &&
      squares[combination[0]] !== ""
    ) {
      return squares[combination[0]];
    }
  }

  return "";
};

export const minimax = (isMAXturn, board, depth, alpha, beta, maxMark) => {
  const minMark = maxMark === "O" ? "X" : "O";
  let newBoard = board.slice();

  const emptyCells = findEmptyCells(board);
  const winner = checkWinner(board);

  if (winner === maxMark) {
    return 1 / depth;
  }
  if (winner === minMark) {
    return -1;
  }
  if (declareTie(board)) {
    return 0;
  }
  let scores = [];
  const nextTurn = isMAXturn ? maxMark : minMark;
  for (let i = 0; i < emptyCells.length; i += 1) {
    newBoard[emptyCells[i]] = nextTurn;
    const score = minimax(
      !isMAXturn,
      newBoard,
      depth + 1,
      alpha,
      beta,
      maxMark
    );
    scores.push(score);
    newBoard[emptyCells[i]] = "";
    if (isMAXturn) {
      alpha = Math.max(score, alpha);
    } else {
      beta = Math.min(score, beta);
    }
    if (alpha >= beta) {
      break;
    }
  }

  return isMAXturn ? Math.max(...scores) : Math.min(...scores);
};

export const Grid = () => {
  const [turn, setTurn] = useState("");
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [title, setTitle] = useState("Choose Type of Game");
  const [game, setGame] = useState("");
  const [ended, setEnded] = useState(true);
  const [markClass, setMarkClass] = useState("not");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const win = checkWinner(squares);
    if (win !== "") {
      return gameOver(`WINNER: ${win}`);
    }
    if (declareTie(squares)) {
      return gameOver("IT'S A TIE");
    }
    if (!ended) {
      const mark = turn === "X" ? "O" : "X";
      setTitleAndTurn(mark);
    }

    return true;
  }, [squares]);

  useEffect(() => {
    if (game === "PvC" && clicked) {
      setTimeout(() => {
        computerMove(turn);
      }, 200);
      setClicked(false);
    }
    if (game === "CvC") {
      setTimeout(() => {
        computerMove(turn);
      }, 200);
    }
  }, [turn, game, ended]);
  const setTitleAndTurn = (mark) => {
    setTitle(`Next Player: ${mark}`);

    setTurn(mark);
  };

  const markCell = (squareIndex, mark) => {
    let newBoard = squares.slice();
    if (ended || game === "") {
      return false;
    }
    newBoard[squareIndex] = mark;
    setSquares(newBoard);

    return newBoard;
  };

  const gameOver = (newTitle) => {
    setTitle(newTitle);
    setEnded(true);

    return false;
  };

  const handleClick = (squareIndex) => {
    if (ended || turn === "" || !(squares[squareIndex] === "")) {
      return;
    }
    markCell(squareIndex, turn);
    setClicked(true);
  };

  const makeBestMove = (mark) => {
    let bestScore = -Infinity;
    let bestMove;
    let newBoard = squares.slice();

    const emptyCells = findEmptyCells(squares);

    for (let i = 0; i < emptyCells.length; i += 1) {
      newBoard[emptyCells[i]] = mark;
      const score = minimax(false, newBoard, 0, -Infinity, Infinity, mark);
      newBoard[emptyCells[i]] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = emptyCells[i];
      }
    }
    markCell(bestMove, mark);
  };

  const computerMove = (mark) => {
    if (ended) {
      return;
    }

    makeBestMove(mark);
  };

  const gameChange = (newGame, newTitle) => {
    setEnded(true);
    setSquares(Array(9).fill(""));
    setGame(newGame);
    setTitle(newTitle);
    if (newGame === "") {
      setMarkClass("not");
    } else {
      setMarkClass("");
    }
  };

  const gameStart = (newTurn) => {
    setClicked(false);
    setTurn(newTurn);
    if (!(game === "CvC")) {
      setTitle(`Next Player: ${newTurn}`);
    }
    setMarkClass("not");
    setEnded(false);
  };

  return (
    <table className="grid">
      <h1 id="title">
        {title}
        <div className={markClass}>
          <button id="markX" onClick={() => gameStart("X")}>
            X
          </button>
          <button id="markO" onClick={() => gameStart("O")}>
            O
          </button>
        </div>
      </h1>
      <div>
        <button
          id="reset"
          onClick={() => gameChange("", "Choose Type of Game")}
        >
          Reset
        </button>
        <button id="PvP" onClick={() => gameChange("PvP", "Choose Mark")}>
          Person vs Person
        </button>
        <button id="PvC" onClick={() => gameChange("PvC", "Choose Mark")}>
          Person vs Computer
        </button>
        <button id="CvC" onClick={() => gameChange("CvC", "Choose Mark")}>
          Computer vs Computer
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
