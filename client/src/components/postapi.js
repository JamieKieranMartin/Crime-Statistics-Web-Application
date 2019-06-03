import { useState, useEffect } from "react";
import config from "../config.json";

export function useDataPost(props) {
  const [loading, setLoading] = useState(true);
  const [object, setObject] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    postAPI(props)
      .then(object => {
        setObject(object);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    object,
    error: null
  };
}

function postAPI(props) {
  let getParam = {
    method: "POST",
    body: `email=${props.email}&password=${props.password}`
  };
  let head = { "Content-type": "application/x-www-form-urlencoded" };
  getParam.headers = head;

  const url = `${config.server}${props.base}`;

  return fetch(url, getParam).then(res => res.json());
}
