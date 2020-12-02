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
});
