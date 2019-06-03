import React from "react";

export function Sort(props) {
  return (
    <select
      className="custom-select col-4"
      value={props.sort}
      onChange={props.handleSortChange}
    >
      <option defaultValue>Sort</option>
      <option value="0-9">0-9</option>
      <option value="9-0">9-0</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
    </select>
  );
}
