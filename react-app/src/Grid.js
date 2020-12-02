import React from "react";
import { Square } from "./Square";

export const Grid = () => {
  return (
    <table className="grid">
      <th>
        <Square />
        <Square />
        <Square />
      </th>
      <th>
        <Square />
        <Square />
        <Square />
      </th>
      <th>
        <Square />
        <Square />
        <Square />
      </th>
    </table>
  );
};

export default Grid;
