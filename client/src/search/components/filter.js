import React from "react";

export function Filter(props) {
  const select = props.options.value;
  const options = props.options.list;
  const handleFilterChange = props.handleFilterChange;

  return (
    <select
      value={props.value}
      name={select}
      onChange={handleFilterChange}
      className="custom-select col-3"
    >
      <option defaultValue value={""}>
        {select}
      </option>
      {options.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
