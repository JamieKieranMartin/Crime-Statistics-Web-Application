import React from "react";
import { Link } from "react-router-dom";
import { useDataObject } from "../components/getapi";
import { Item } from "./components/item";

export function LoadOffences(props) {
  const { loading, object, error } = useDataObject({
    base: props.location.pathname
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center middle">
        <div className="spinner-border">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div className="list-group">
      {object.offences.map(item => (
        <Item key={item} title={item} />
      ))}
    </div>
  );
}
