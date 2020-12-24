import React, { useState, useEffect } from "react";
import { Square } from "./Square";
import { Data } from "./Data";

const axios = require("axios");

const markX = "X";
const markO = "O";

export const changeMark = (currentMark) => {
  return currentMark === markX ? markO : markX;
};

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
  const minMark = changeMark(maxMark);
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
  const hideClass = "not-display";

  const [turn, setTurn] = useState("");
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [title, setTitle] = useState("Choose Type of Game");
  const [game, setGame] = useState("");
  const [ended, setEnded] = useState(true);
  const [markClass, setMarkClass] = useState(hideClass);
  const [saveClass, setSaveClass] = useState(hideClass);
  const [clicked, setClicked] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState("");
  const [firstPlayerClass, setFirstPlayerClass] = useState(hideClass);
  const [data, setData] = useState({});

  const personVsPerson = "PvP";
  const personVsComputer = "PvC";
  const computerVsComputer = "CvC";

  const computer = "Computer";
  const person = "Person";

  const setTitleAndTurn = (mark) => {
    setTitle(`Next Player: ${mark}`);
    setTurn(mark);
  };

  const gameOver = (newTitle) => {
    setSaveClass("");
    setTitle(newTitle);
    setEnded(true);
  };

  const markCell = (squareIndex, mark) => {
    let newBoard = squares.slice();
    newBoard[squareIndex] = mark;
    setSquares(newBoard);
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

  useEffect(() => {
    if (game === personVsComputer && clicked) {
      setTimeout(() => {
        computerMove(turn);
      }, 200);
      setClicked(false);
    }
  }, [turn, game, ended]);

  useEffect(() => {
    if (game === computerVsComputer && !ended) {
      setTimeout(() => {
        computerMove(turn);
      }, 200);
    }
  }, [turn, ended, game]);

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
      setTitleAndTurn(changeMark(turn));
    }
  }, [squares]);

  const handleClick = (squareIndex) => {
    if (
      ended ||
      squares[squareIndex] ||
      (game === personVsComputer && !firstPlayer) ||
      !game
    ) {
      return;
    }
    markCell(squareIndex, turn);
    setClicked(true);
  };

  useEffect(() => {
    if (firstPlayer === computer) {
      const mark = changeMark(turn);
      setTitleAndTurn(mark);
      computerMove(mark);
    } else if (firstPlayer === person) {
      setTitle(`Next Player: ${turn}`);
    }
    setFirstPlayerClass(hideClass);
  }, [firstPlayer]);

  const gameChange = (newGame, newTitle) => {
    setSaveClass(hideClass);
    setEnded(true);
    setFirstPlayer("");
    setFirstPlayerClass(hideClass);
    setSquares(Array(9).fill(""));
    setGame(newGame);
    setTitle(newTitle);
    if (!newGame) {
      setMarkClass(hideClass);
    } else {
      setMarkClass("");
    }
  };

  const gameStart = (newTurn) => {
    setSaveClass(hideClass);
    setClicked(false);
    setTurn(newTurn);
    if (game === computerVsComputer) {
      setTitle("Starting the game");
    } else if (game === personVsPerson) {
      setTitle(`Next Player: ${newTurn}`);
    } else {
      setTitle("Choose first player");
      setFirstPlayerClass("");
    }
    setMarkClass(hideClass);
    setEnded(false);
  };

  const saveData = async () => {
    const squaresString = squares.join(",");
    const res = await axios.post(`/add/${squaresString}`);
    setData(res.data);
  };

  const getData = async () => {
    const res = await axios.get("/getTable");
    setData(res.data);
  };

  const deleteInstance = async (id) => {
    const res = await axios.post(`/delete/${id}`);
    setData(res.data);
  };

  return (
    <table className="grid">
      <h1 id="title">
        {title}
        <div className={markClass}>
          <button id="markX" onClick={() => gameStart(markX)}>
            X
          </button>
          <button id="markO" onClick={() => gameStart(markO)}>
            O
          </button>
        </div>
        <div className={firstPlayerClass}>
          <button id={person} onClick={() => setFirstPlayer(person)}>
            Person
          </button>
          <button id={computer} onClick={() => setFirstPlayer(computer)}>
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
        <button
          id={personVsPerson}
          onClick={() => gameChange(personVsPerson, "Choose Mark")}
        >
          Person vs Person
        </button>
        <button
          id={personVsComputer}
          onClick={() => gameChange(personVsComputer, "Choose Mark")}
        >
          Person vs Computer
        </button>
        <button
          id={computerVsComputer}
          onClick={() => gameChange(computerVsComputer, "Choose First Player")}
        >
          Computer vs Computer
        </button>
      </div>

      <th className="grid-th">
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
      <th className="grid-th">
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
      <th className="grid-th">
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
      <div className="button-row">
        <button onClick={() => saveData()} className={saveClass}>
          Save
        </button>
        <button onClick={() => getData()} id="get-button">
          Get Old Games
        </button>
      </div>
      <div>
        <Data data={data} setBoard={setSquares} delete={deleteInstance} />
      </div>
    </table>
  );
};

export default Grid;
