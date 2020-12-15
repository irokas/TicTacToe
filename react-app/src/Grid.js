import React, { useState, useEffect } from "react";
import { Square } from "./Square";

export const findEmptyCells = (squares) => {
  const reducer = (accumulator, currentValue, currentIndex) => {
    if (!currentValue) {
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
      squares[combination[0]]
    ) {
      return squares[combination[0]];
    }
  }

  return null;
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
  const [markClass, setMarkClass] = useState("not-display");
  const [clicked, setClicked] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState("");
  const [firstPlayerClass, setFirstPlayerClass] = useState("not-display");

  const setTitleAndTurn = (mark) => {
    setTitle(`Next Player: ${mark}`);

    setTurn(mark);
  };

  const gameOver = (newTitle) => {
    setTitle(newTitle);
    setEnded(true);
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
    setTimeout(() => {
      makeBestMove(mark);
    }, 200);
  };
  useEffect(() => {
    if (game === "PvC" && clicked) {
      computerMove(turn);
      setClicked(false);
    }
  }, [turn, game, ended]);

  useEffect(() => {
    if (game === "CvC" && !ended) {
      computerMove(turn);
    }
  }, [turn, ended]);

  useEffect(() => {
    const winner = checkWinner(squares);
    if (winner) {
      gameOver(`WINNER: ${winner}`);

      return;
    }
    if (declareTie(squares)) {
      gameOver("IT'S A TIE");

      return;
    }
    if (!ended) {
      const mark = turn === "X" ? "O" : "X";

      setTitleAndTurn(mark);
    }
  }, [squares]);

  const markCell = (squareIndex, mark) => {
    let newBoard = squares.slice();
    if (ended || !game) {
      return;
    }
    newBoard[squareIndex] = mark;
    setSquares(newBoard);
  };

  const handleClick = (squareIndex) => {
    if (ended || squares[squareIndex] || (game === "PvC" && !firstPlayer)) {
      return;
    }
    markCell(squareIndex, turn);
    setClicked(true);
  };

  useEffect(() => {
    if (firstPlayer === "C") {
      const mark = turn === "X" ? "O" : "X";
      setTitleAndTurn(mark);
      computerMove(mark);
    } else if (firstPlayer === "P") {
      setTitle(`Next Player: ${turn}`);
    }
    setFirstPlayerClass("not-display");
  }, [firstPlayer]);

  const gameChange = (newGame, newTitle) => {
    setEnded(true);
    setFirstPlayer("");
    setFirstPlayerClass("not-display");
    setSquares(Array(9).fill(""));
    setGame(newGame);
    setTitle(newTitle);
    if (!newGame) {
      setMarkClass("not-display");
    } else {
      setMarkClass("");
    }
  };

  const gameStart = (newTurn) => {
    setClicked(false);
    setTurn(newTurn);
    if (game === "CvC") {
      setTitle("Starting the game");
    } else if (game === "PvP") {
      setTitle(`Next Player: ${newTurn}`);
    } else {
      setTitle("Choose first player");
      setFirstPlayerClass("");
    }
    setMarkClass("not-display");
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
        <div className={firstPlayerClass}>
          <button id="Person" onClick={() => setFirstPlayer("P")}>
            Person
          </button>
          <button id="Computer" onClick={() => setFirstPlayer("C")}>
            Computer
          </button>
        </div>
      </h1>
      <div className="button-row">
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
        <button
          id="CvC"
          onClick={() => gameChange("CvC", "Choose First Player")}
        >
          Computer vs Computer
        </button>
      </div>

      <th>
        {[0, 1, 2].map((key) => {
          return (
            <Square
              onClick={() => handleClick(key)}
              value={squares[key]}
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
              value={squares[key]}
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
              value={squares[key]}
              key={key}
            />
          );
        })}
      </th>
    </table>
  );
};

export default Grid;
