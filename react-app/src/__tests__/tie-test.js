import React from "react";
import { shallow } from "enzyme";

import Grid from "../Grid";
import Square from "../Square";

const grid = shallow(<Grid />);
grid.find("#PvP").simulate("click"); //start PvP game on grid

describe("Tie tests", () => {
  it("Should declare tie", () => {
    //Simulate a game that ends with a tie
    grid.find(Square).at(3).simulate("click"); //X->3
    grid.find(Square).at(0).simulate("click"); //O->0
    grid.find(Square).at(1).simulate("click"); //X->1
    grid.find(Square).at(5).simulate("click"); //O->5
    grid.find(Square).at(4).simulate("click"); //X->4
    grid.find(Square).at(2).simulate("click"); //O->2
    grid.find(Square).at(6).simulate("click"); //X->6
    grid.find(Square).at(7).simulate("click"); //O->7
    grid.find(Square).at(8).simulate("click"); //X->8

    expect(grid.find("#title").text()).toBe("IT'S A TIE");
  });
});
