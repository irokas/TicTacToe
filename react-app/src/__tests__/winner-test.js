import React from "react";
import { shallow } from "enzyme";
import { Grid } from "../Grid";
import { Square } from "../Square";
const gridX = shallow(<Grid />);
const gridO = shallow(<Grid />);
describe("Tests for declaring winner", () => {
  it("should declare X as winner", () => {
    gridX.find(Square).at(0).simulate("click");
    gridX.find(Square).at(3).simulate("click");
    gridX.find(Square).at(1).simulate("click");
    gridX.find(Square).at(5).simulate("click");
    gridX.find(Square).at(2).simulate("click");

    expect(gridX.childAt(0).text()).toBe("WINNER: X");
  });
  it("should declare O as winner", () => {
    gridO.find(Square).at(4).simulate("click");
    gridO.find(Square).at(0).simulate("click");
    gridO.find(Square).at(3).simulate("click");
    gridO.find(Square).at(1).simulate("click");
    gridO.find(Square).at(8).simulate("click");
    gridO.find(Square).at(2).simulate("click");

    expect(gridO.childAt(0).text()).toBe("WINNER: O");
  });
  it("should keep the grid unchanged after a winner is declared", () => {
    const copyGridO = gridO;
    copyGridO.find(Square).at(7).simulate("click");
    copyGridO.find(Square).at(5).simulate("click");

    expect(gridO === copyGridO).toBe(true);
  });
});
