import React from "react";

const createDate = (newDate) => {
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
export const Data = (props) => {
  if (props.data.length) {
    return (
      <table>
        <tr className="data-tr">
          <th className="data-th">ID</th>
          <th className="data-th">Created At</th>
          <th className="data-th">Retrieve Game</th>
        </tr>
        {props.data.map((instance) => {
          return (
            <tr className="data-tr">
              <td className="data-td">{instance.id}</td>
              <td className="data-td">{createDate(instance.created_at)}</td>
              <td className="data-td">
                <button onClick={() => props.set(instance.board.split(","))}>
                  Retrieve Game
                  {` ${instance.id}`}
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
