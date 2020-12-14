import React from "react";
import { shallow } from "enzyme";

import { Grid } from "../Grid";
import { Square } from "../Square";

const grid = shallow(<Grid />);
grid.find("#PvP").simulate("clicl");

describe("test reset button", () => {
  it("All squares must be empty after reset", () => {
    grid.find(Square).at(3).simulate("click"); // X->3
    grid.find(Square).at(0).simulate("click"); // O->0
    grid.find("#reset").simulate("click"); // Simulate click on reset button

    grid.find(Square).map((square) => expect(square.prop("turn")).toBeFalsy());
  });
});
