import React from "react";
import { Link } from "react-router-dom";

export function Item(props) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-10 my-auto">
          <Link
            to={`/graph?offence=${encodeURIComponent(
              props.offence
            )}&area=${encodeURIComponent(props.item.LGA)}`}
            className="h5"
          >
            {props.item.LGA}
          </Link>
        </div>
        <div className="col-2 my-auto">
          <div className="float-right">{props.item.total}</div>
        </div>
      </div>
    </div>
  );
}
