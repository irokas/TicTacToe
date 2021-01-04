import React from "react";
import { shallow } from "enzyme";
import { Data } from "../Data";

const data = require("../Data.js");

const newData = [
  {
    id: 7,
    board: "X,O,,X,X,O,O,,X",
    created_at: "2020-12-22T12:41:08.835Z",
  },
  {
    id: 9,
    board: "X,X,O,O,O,X,X,O,X",
    created_at: "2020-12-22T13:41:14.388Z",
  },
  {
    id: 11,
    board: "O,O,X,X,O,,,X,O",
    created_at: "2020-12-22T14:03:52.255Z",
  },
  {
    id: 15,
    board: "O,O,X,X,O,,,X,O",
    created_at: "2020-12-23T14:03:52.255Z",
  },
  {
    id: 19,
    board: "O,O,X,X,O,,,X,O",
    created_at: "2020-12-23T16:05:52.235Z",
  },
  {
    id: 23,
    board: "O,O,X,X,O,,,X,O",
    created_at: "2020-12-24T09:12:52.225Z",
  },
];
const dataInstance = shallow(<Data data={newData} />);

describe("Square test", () => {
  it("Should change date format", () => {
    const date = "2020-12-22T12:41:08.835Z";
    expect(data.createDate(date)).toBe("22/12/2020 14:41:08");
  });

  it("Should return a table", () => {
    expect(dataInstance.first().type()).toEqual("table");
  });
});
