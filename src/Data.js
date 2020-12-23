import axios from "axios";
import React from "react";

export const createDate = (newDate) => {
  const fullDate = new Date(newDate.replace(" ", "T"));
  const date = [
    `0${fullDate.getDate()}`.slice(-2),
    `0${fullDate.getMonth() + 1}`.slice(-2),
    fullDate.getFullYear(),
  ].join("/");

  const time = [
    `0${fullDate.getHours()}`.slice(-2),
    `0${fullDate.getMinutes()}`.slice(-2),
    `0${fullDate.getSeconds()}`.slice(-2),
  ].join(":");

  return [date, time].join(" ");
};

export const deleteInstance = async (id) => {
  await axios.post(`/delete/${id}`);
};

export const Data = (props) => {
  if (props.data.length) {
    return (
      <table>
        <tr className="data-tr">
          <th className="data-th">Created At</th>
          <th className="data-th">Retrieve Game</th>
          <th className="data-th">Delete Game</th>
        </tr>
        {props.data.map((instance) => {
          return (
            <tr className="data-tr" key={instance.id}>
              <td className="data-td">{createDate(instance.created_at)}</td>
              <td className="data-td">
                <button
                  onClick={() => props.setBoard(instance.board.split(","))}
                >
                  Retrieve Game
                </button>
              </td>
              <td className="data-td">
                <button onClick={() => deleteInstance(instance.id)}>
                  Delete Game
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  return <table />;
};
