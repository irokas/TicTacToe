import React from "react";
import { shallow } from "enzyme";

import Square from "../Square";

describe("Square test", function () {
  it("should render without throwing an error", () => {
    expect(
      shallow(<Square />).contains(<button className="square"></button>)
    ).toBe(true);
  });

  it('should be selectable by class "square"', () => {
    expect(shallow(<Square />).is(".square")).toBe(true);
  });
});
