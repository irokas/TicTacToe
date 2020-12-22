import React from "react";
import { shallow } from "enzyme";

import { Square } from "../Square";

describe("Square test", () => {
  it("should render without throwing an error", () => {
    expect(
      shallow(<Square />).contains(<td className="square grid-td" />)
    ).toBe(true);
  });

  it('should be selectable by class "square"', () => {
    expect(shallow(<Square />).is(".square")).toBe(true);
  });
});
