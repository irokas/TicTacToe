const gridJs = require("../Grid.js");

describe("Test the minimax algorithm", () => {
  it("should return cell #6", () => {
    const board = ["", "", "O", "X", "O", "X", "", "X", ""];
    let bestScore = -2;
    let bestMove = -1;
    let newBoard = board.slice();

    const emptyCells = gridJs.findEmptyCells(board);

    for (let i = 0; i < emptyCells.length; i += 1) {
      newBoard[emptyCells[i]] = "O";
      const score = gridJs.minimax(
        false,
        newBoard,
        0,
        -Infinity,
        Infinity,
        "O"
      );
      newBoard[emptyCells[i]] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = emptyCells[i];
      }
    }
    expect(bestMove).toBe(6);
  });

  it("should return cell #8", () => {
    const board = ["X", "O", "O", "", "X", "", "", "X", ""];
    let bestScore = -2;
    let bestMove = -1;
    let newBoard = board.slice();

    const emptyCells = gridJs.findEmptyCells(board);

    for (let i = 0; i < emptyCells.length; i += 1) {
      newBoard[emptyCells[i]] = "O";
      const score = gridJs.minimax(
        false,
        newBoard,
        0,
        -Infinity,
        Infinity,
        "O"
      );
      newBoard[emptyCells[i]] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = emptyCells[i];
      }
    }
    expect(bestMove).toBe(8);
  });
});
