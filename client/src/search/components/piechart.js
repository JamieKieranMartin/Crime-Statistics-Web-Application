import React from "react";
import { Pie } from "react-chartjs-2";
import { getRandomColor } from "../functions/functions";

export function PieChart(props) {

  const datasets = props.list
  let data = datasets.map(item => item.total);
  let labels = datasets.map(item => item.LGA);
  let colors = datasets.map(item => getRandomColor());

  return (
    <div className="top-item my-4">
      <Pie
        width={100}
        height={80}
        data={{
          datasets: [
            {
              data: data,
              backgroundColor: colors,
              borderWidth: 0.25
            }
          ],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: labels
        }}
        options={{
          title: {
            display: true,
            text: `Spread of ${props.title} by LGA`,
            position: "bottom"
          },
          legend: {
            display: false
          }
        }}
      />
      <small className="form-text text-muted text-center">
        Hover/Tap to view LGA title and total
      </small>
    </div>
  );
}
