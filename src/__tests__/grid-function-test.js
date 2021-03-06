const gridJs = require("../Grid.js");

describe("Tests the functions inside Grid.js", () => {
  //  changeMark tests
  it("should return O when X is given", () => {
    expect(gridJs.changeMark("X")).toBe("O");
  });

  it("should return X when O is given", () => {
    expect(gridJs.changeMark("O")).toBe("X");
  });

  //  findEmptyCells tests
  it("should test findEmptyCells called with an empty array with length = 9", () => {
    expect(gridJs.findEmptyCells(Array(9).fill("")).length).toBe(9);
  });

  it("should test findEmptyCells when called with non-empty array", () => {
    let squares = Array(9).fill("");
    squares[6] = "X";
    squares[3] = "O";
    expect(gridJs.findEmptyCells(squares).length).toBe(7);
  });

  it("should test findEmptyCells when called with full array", () => {
    const filledSquares = Array(9).fill("X");
    expect(gridJs.findEmptyCells(filledSquares).length).toBe(0);
  });

  //  declareTie tests
  it("should declare tie", () => {
    const tieSquares = ["X", "O", "X", "X", "O", "X", "O", "X", "O"];
    expect(gridJs.declareTie(tieSquares)).toBe(true);
  });

  //  declareWinner tests
  it("should not declare winner", () => {
    const notWinnerTests = ["X", "O", "X", "X", "O", "X", "O", "X", "O"];
    expect(gridJs.checkWinner(notWinnerTests)).toBeFalsy();
  });

  it("should declare winner", () => {
    const xWinnerSquares = ["X", "O", "X", "O", "O", "X", "O", "X", "X"];
    expect(gridJs.checkWinner(xWinnerSquares)).toBe("X");
  });
});
