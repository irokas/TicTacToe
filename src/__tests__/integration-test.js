import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import { Grid } from "../Grid";
import { Data } from "../Data";

const data = [
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

jest.useFakeTimers();

const grid = shallow(<Grid />);
const deleteProp = grid.find(Data).prop("delete");
const setBoardProp = grid.find(Data).prop("setBoard");

const dataInstance = shallow(
  <Data data={data} delete={deleteProp} setBoard={setBoardProp} />
);

axios.get = jest.fn(() => Promise.resolve(data));
axios.post = jest.fn(() => Promise.resolve(data));

describe("Test axios calls", () => {
  it("Fetch old games calls axios get correctly", () => {
    grid.find("#get-button").simulate("click");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/getTable");
  });

  it("Saving a game should call axios post correctly", () => {
    // simulate CvC game start to save the final state
    grid.find("#CvC").simulate("click");
    grid.find("#markO").simulate("click");
    jest.runAllTimers();

    grid.find("#save-button").simulate("click");
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenLastCalledWith("/add/O,O,X,X,X,O,O,X,O");
  });

  it("Deleting a game should call axios post correctly", () => {
    dataInstance.find(".delete-button").at(2).simulate("click");
    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(axios.post).toHaveBeenLastCalledWith("/delete/11");
  });

  it("Rettrieving a game should set the board appropriately", () => {
    dataInstance.find(".retrieve-button").at(2).simulate("click");
    const board = data[2].board.split(",");
    for (let i = 0; i < 9; i += 1) {
      expect(grid.find("Square").at(i).prop("value")).toBe(board[i]);
    }
  });

  it("Should return empty data instance of given data is empty", () => {
    const emptyWrapper = shallow(<Data data={[]} />);
    expect(emptyWrapper.matchesElement(<div />)).toBeTruthy();
  });
});
