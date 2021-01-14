import React from "react";
import { shallow } from "enzyme";
import { MustContainItem } from "../MustContainItem";

describe("mustContainItem tests", () => {
  it("should be selectable by class MustContainItem", () => {
    expect(
      shallow(
        <MustContainItem
          data={['An uppercase letter (a-z)', true, 0]}
          key="0"
        />
      ).is('.MustContainItem')
    ).toBe(true);
  });
});
