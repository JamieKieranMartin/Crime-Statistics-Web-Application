import React from "react";

export function SearchBar(props) {
  return (
    <input
      className="form-control col-8"
      placeholder="Search an area"
      name="area"
      value={props.search}
      onChange={props.handleSearchChange}
    />
  );
}
