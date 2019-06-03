import { useState, useEffect } from "react";
import config from "../config.json";
export function useDataObject(props) {
  const [loading, setLoading] = useState(true);
  const [object, setObject] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAPI(props)
      .then(object => {
        setObject(object);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, [props.query]);

  return {
    loading,
    object,
    error: null
  };
}

function getAPI(props) {
  let getParam = { method: "GET" };
  let head;
  props.JWT !== ""
    ? (head = { Authorization: `Bearer ${props.JWT}` })
    : (head = "");
  getParam.headers = head;

  const url = props.query
    ? `${config.server}${props.base}${props.query}`
    : `${config.server}${props.base}`;

  return fetch(url, props.JWT !== "" ? getParam : null).then(res => res.json());
}
