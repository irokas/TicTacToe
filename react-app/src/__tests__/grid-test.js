import React from "react";

import { shallow } from "enzyme";

import { Grid } from "../Grid";
import { Square } from "../Square";

jest.useFakeTimers();

const grid = shallow(<Grid />);
describe("Grid test", () => {
  it('should be selectable by class "grid"', () => {
    expect(grid.is(".grid")).toBe(true);
  });

  it("should contain 5 children", () => {
    expect(grid.children().length).toBe(5);
  });

  it("should contain 9 squares", () => {
    expect(grid.find(Square).length).toBe(9);
  });

  it("check initial value of all squares", () => {
    grid.find(Square).map((square) => expect(square.prop("value")).toBeFalsy());
  });

  it("Title should be choose type of game", () => {
    expect(grid.childAt(0).text()).toContain("Choose Type of Game");
  });

  it("check square value after first click", () => {
    // simulate PvP game start
    grid.find("#PvP").simulate("click");
    grid.find("#markX").simulate("click");
    grid.find(Square).at(1).simulate("click");

    expect(grid.find(Square).at(1).prop("value")).toBe("X");
  });

  it("next turn should be O", () => {
    expect(grid.childAt(0).text()).toContain("Next Player: O");
  });

  it("check square value after second click", () => {
    grid.find(Square).at(4).simulate("click");
    expect(grid.find(Square).at(4).prop("value")).toBe("O");
  });

  it("next turn should be X", () => {
    expect(grid.childAt(0).text()).toContain("Next Player: X");
  });

  it("should call setTimeout", () => {
    // simulate PvC game start
    grid.find("#PvC").simulate("click");
    grid.find("#markX").simulate("click");
    grid.find("#Computer").simulate("click");

    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});
