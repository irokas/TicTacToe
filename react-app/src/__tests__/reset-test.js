import React from "react";
import { shallow } from "enzyme";

import { Grid } from "../Grid";
import { Square } from "../Square";

const grid = shallow(<Grid />);
grid.find("#PvP").simulate("clicl");
describe("test reset button", () => {
  it("should be empty at the end", () => {
    grid.find(Square).at(3).simulate("click"); // X->3
    grid.find(Square).at(0).simulate("click"); // O->0
    grid.find("#reset").simulate("click");
    expect(grid.find(Square).at(3).prop("turn")).toBe("");
  });
});
