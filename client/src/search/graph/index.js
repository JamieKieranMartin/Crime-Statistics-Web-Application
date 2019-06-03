import React from "react";
import { useDataObject } from "../../components/getmultiapi";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { getRandomColor } from "../functions/functions";

export function LoadGraph(props) {
  const { loading, object, error } = useDataObject({
      base: "/search",
      query: props.location.search,
      JWT: props.JWT
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
    return <p>Something went wrong: {error}</p>;
  }
  console.log(object);
  const dataset = object.map(obj => {
    return {
      area: obj.query.area,
      offence: obj.query.offence,
      year: obj.query.year,
      total: obj.result[0].total
    };
  });
  let colors = dataset.map(item => getRandomColor());

  if (dataset !== []) {
    return (
      <div className="list-group">
        <Link to={`/search?offence=${dataset[0].offence}`}>Back to list</Link>
        <div className="list-group-item d-flex flex-wrap align-items-center nopadding my-2">
          <Bar
            width={100}
            height={70}
            data={{
              datasets: [
                {
                  data: dataset.map(obj => obj.total),
                  backgroundColor: colors,
                  borderWidth: 0.25
                }
              ],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: dataset.map(obj => obj.year)
            }}
            options={{
              title: {
                display: true,
                text: `${dataset[0].area} | ${dataset[0].offence} by year`,
                position: "bottom"
              },
              legend: {
                display: false
              }
            }}
          />
        </div>
      </div>
    );
  } else {
    return <div className="list-group">Please Refresh The Page</div>;
  }
}
