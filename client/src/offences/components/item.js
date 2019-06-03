import React from "react";
import { Link } from "react-router-dom";

export function Item(props) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-10 my-auto">
          <p className="h5">{props.title}</p>
        </div>
        <div className="col-2 my-auto">
          <Link
            className="btn btn-outline-dark w-100"
            to={`/search?offence=${encodeURIComponent(props.title)}`}
          >
            >
          </Link>
        </div>
      </div>
    </div>
  );
}
