import React from "react";
import { shallow } from "enzyme";

import Grid from "../Grid";
import Square from "../Square";

const grid = shallow(<Grid />);

describe("Grid test", () => {
  it('should be selectable by class "grid"', () => {
    expect(grid.is(".grid")).toBe(true);
  });
  it("should contain 3 children divs", () => {
    expect(grid.children().length).toBe(3);
  });
  it("should contain 9 squares", () => {
    expect(grid.find(Square).length).toBe(9);
  });
  it("check initial value of square", () => {
    expect(grid.find(Square).at(1).prop("turn")).toBe("");
  });
  it("check initial value of all squares", () => {
    grid.find(Square).map((square) => expect(square.prop("turn")).toBe(""));
  });
  it("check square value after first click", () => {
    grid.find(Square).at(1).simulate("click");
    expect(grid.find(Square).at(1).prop("turn")).toBe("X");
  });
  it("check square value after second click", () => {
    grid.find(Square).at(4).simulate("click");
    expect(grid.find(Square).at(4).prop("turn")).toBe("O");
  });
});
