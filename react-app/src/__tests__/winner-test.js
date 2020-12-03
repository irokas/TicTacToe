import React from "react";
import { shallow } from "enzyme";
import { Grid } from "../Grid";
import { Square } from "../Square";
const grid = shallow(<Grid />);

describe("Tests for declaring winner", () => {
  it("should declare X as winner", () => {
    grid.find(Square).at(0).simulate("click");
    grid.find(Square).at(3).simulate("click");
    grid.find(Square).at(1).simulate("click");
    grid.find(Square).at(5).simulate("click");
    grid.find(Square).at(2).simulate("click");
    expect(grid.childAt(0).text()).toBe("WINNER: X");
  });
});
