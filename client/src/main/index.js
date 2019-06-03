import React from "react";
import { Link } from "react-router-dom";

export function Main(props) {
  return (
    <div className="jumbotron my-4">
      <h1 className="display-4">crime.io</h1>
      <p className="lead">
        This is a single page web application developed for crime statistics
        analysis. This web application was built for a university project on
        modern web computing - focusing on Javascript both for the client-side
        and server-side. Both the frontend and backend were built from the
        ground up utilising React, Node, mySQL and Express. React Mapbox JS and
        ChartJS 2 were utilised for mapping and graphing respectively.
        <br />
        <br />
        Developed and designed by Jamie Martin
      </p>
      <hr className="my-4" />
      {props.JWT === "" ? (
        <div className="my-4">
          <Link className="btn btn-outline-dark btn-lg mx-1" to="/register">
            Register Here
          </Link>
        </div>
      ) : null}
      <small className="text-muted">
        Data retrieved from
        https://data.qld.gov.au/dataset/lga_reported_offender_numbers/resource/32d7bc11-55ed-4c52-86ff-e9d780cfe9ce
      </small>
    </div>
  );
}
