import React from "react";
import { Square } from "./Square";

export const Grid = () => {
  return (
    <div className="grid">
      <div>
        <Square />
        <Square />
        <Square />
      </div>
      <div>
        <Square />
        <Square />
        <Square />
      </div>
      <div>
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
};

export default Grid;
