import React from "react";

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
              <td className="data-td">{instance.created_at}</td>
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
