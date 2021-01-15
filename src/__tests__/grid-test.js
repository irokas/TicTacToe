import React from "react";
import axios from "axios";
import { shallow } from "enzyme";

import { Grid } from "../Grid";
import { Square } from "../Square";

jest.useFakeTimers();
jest.mock('axios');

const grid = shallow(<Grid />);
describe("Grid test", () => {
  it("should contain 2 children", () => {
    expect(grid.children().length).toBe(2);
  });

  it("should contain 9 squares", () => {
    expect(grid.find(Square).length).toBe(9);
  });

  it("check initial value of all squares", () => {
    grid.find(Square).map((square) => expect(square.prop("value")).toBeFalsy());
  });

  it("Title should be choose type of game", () => {
    expect(grid.childAt(1).childAt(0).text()).toContain("Choose Type of Game");
  });

  it("check square value after first click", () => {
    // simulate PvP game start
    grid.find("#PvP").simulate("click");
    grid.find("#markX").simulate("click");
    grid.find(Square).at(1).simulate("click");

    expect(grid.find(Square).at(1).prop("value")).toBe("X");
  });

  it("next turn should be O", () => {
    expect(grid.childAt(1).childAt(0).text()).toContain("Next Player: O");
  });

  it("check square value after second click", () => {
    grid.find(Square).at(4).simulate("click");
    expect(grid.find(Square).at(4).prop("value")).toBe("O");
  });

  it("next turn should be X", () => {
    expect(grid.childAt(1).childAt(0).text()).toContain("Next Player: X");
  });

  it("should call setTimeout when person starts", () => {
    // simulate PvC game start
    grid.find("#PvC").simulate("click");
    grid.find("#markX").simulate("click");
    grid.find("#Person").simulate("click");

    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  it("should call setTimeout for 200ms when computer starts", () => {
    // simulate PvC game start
    grid.find("#PvC").simulate("click");
    grid.find("#markX").simulate("click");
    grid.find("#Computer").simulate("click");

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 200);
  });

  it("Computer should make best move", () => {
    jest.runOnlyPendingTimers();
    expect(grid.find(Square).at(0).prop("value")).toBe("O");
  });

  it("Computer should win", () => {
    grid.find(Square).at(1).simulate("click");
    jest.runOnlyPendingTimers();
    grid.find(Square).at(8).simulate("click");
    jest.runOnlyPendingTimers();

    expect(grid.find("#title").text()).toContain("WINNER: O");
  });

  it("Should play Computer vs Computer and end as a tie", () => {
    // simulate CvC game start
    grid.find("#CvC").simulate("click");
    grid.find("#markO").simulate("click");
    jest.runAllTimers();
    expect(grid.find("#title").text()).toContain("IT'S A TIE");
  });

  it("Should call axios correctly on logout", () => {
    grid.find("#logout-button").simulate("click");
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenLastCalledWith({
      method: "GET",
      withCredentials: true,
      url: "/logout",
    });
  });
});
