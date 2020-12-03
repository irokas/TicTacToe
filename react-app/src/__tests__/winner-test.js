import React from "react";
import { shallow } from "enzyme";
import { Grid } from "../Grid";
import { Square } from "../Square";

const gridX = shallow(<Grid />); //Grid to test when X is winner
const gridO = shallow(<Grid />); //Grid to test when O is winner
gridX.find("#PvP").simulate("click"); //start PvP game on gridX
gridO.find("#PvP").simulate("click"); //start PvP game on gridO
describe("Tests for declaring winner", () => {
  //Simulate a game where X is winner
  it("should declare X as winner", () => {
    gridX.find(Square).at(0).simulate("click"); //X->0
    gridX.find(Square).at(3).simulate("click"); //O->3
    gridX.find(Square).at(1).simulate("click"); //X->1
    gridX.find(Square).at(5).simulate("click"); //O->5
    gridX.find(Square).at(2).simulate("click"); //X->2

    expect(gridX.find("#title").text()).toBe("WINNER: X");
  });

  //Simulate a game where O is winner
  it("should declare O as winner", () => {
    gridO.find(Square).at(4).simulate("click"); //X->4
    gridO.find(Square).at(0).simulate("click"); //O->0
    gridO.find(Square).at(3).simulate("click"); //X->3
    gridO.find(Square).at(1).simulate("click"); //O->1
    gridO.find(Square).at(8).simulate("click"); //X->8
    gridO.find(Square).at(2).simulate("click"); //O->2

    expect(gridO.find("#title").text()).toBe("WINNER: O");
  });

  //Create a duplicate of finished game and click on
  //the empty cells to compare with the initial
  it("should keep the grid unchanged after a winner is declared", () => {
    const copyGridO = gridO;
    copyGridO.find(Square).at(7).simulate("click");
    copyGridO.find(Square).at(5).simulate("click");
    copyGridO.find(Square).at(6).simulate("click");
    expect(gridO === copyGridO).toBe(true);
  });
});
