import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibjEwMjEyMzYxIiwiYSI6ImNqdXQ3ODJvdjA0enczeXBmdHFub2Mwd20ifQ.Y_RqUfMjb-ecSFK2sGZgjw";

export function Map(props) {
  const list = props.list;
  const [viewport, setViewport] = useState({
    latitude: -20,
    longitude: 146,
    zoom: 4,
    bearing: 0,
    pitch: 0
  });
  const [selected, setSelected] = useState(null);
  return (
    <div className="top-item">
      <ReactMapGL
        {...viewport}
        width="100%"
        height={500}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={view => setViewport(view)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {list.map(item => (
          <Marker
            key={item.LGA}
            latitude={item.lat}
            longitude={item.lng}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <button
              className="mapIcon"
              onClick={e => {
                e.preventDefault();
                setSelected(item);
              }}
            >
              {/* https://thenounproject.com/search/?q=exclamation&i=745434 */}
              <img src="/noun_exclamation_745434.svg" alt={item.LGA} />
            </button>
          </Marker>
        ))}

        {selected ? (
          <Popup
            latitude={selected.lat}
            longitude={selected.lng}
            onClose={() => setSelected(null)}
          >
            <div>
              <div>LGA: {selected.LGA}</div>
              <div>Total: {selected.total}</div>
              <div>Latitude: {selected.lat}</div>
              <div>Longitude: {selected.lng}</div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

/*
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
    >
      <g>
        <g>
          <path d="M50,20.7c16.2,0,29.3,13.1,29.3,29.3S66.2,79.3,50,79.3S20.7,66.2,20.7,50S33.8,20.7,50,20.7 M50,15    c-19.3,0-35,15.7-35,35s15.7,35,35,35c19.3,0,35-15.7,35-35S69.3,15,50,15L50,15z" />
          <path d="M54,35.1L53.2,55c-0.1,1.6-1.4,2.8-2.9,2.7c-1.5-0.1-2.7-1.3-2.7-2.7l-0.8-19.9c-0.1-2,1.5-3.7,3.5-3.7s3.7,1.5,3.7,3.5    C54,34.9,54,35,54,35.1z" />
          <circle style={{ color: "#fff" }} cx="50.4" cy="65.2" r="3.8" />
        </g>
      </g>
    </svg>
  );
}
*/
