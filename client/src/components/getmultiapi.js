import { useState, useEffect } from "react";
import config from "../config.json";
import { options } from "../search/components/options";

export function useDataObject(props) {
  const [loading, setLoading] = useState(true);
  const [object, setObject] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getAPI(props)
      .then(obj => {
        setObject(obj);
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

const getAPI = async (props, year) => {
  let getParam = { method: "GET" };
  let head;
  props.JWT !== ""
    ? (head = { Authorization: `Bearer ${props.JWT}` })
    : (head = "");
  getParam.headers = head;

  const url = props.query
    ? `${config.server}${props.base}${props.query}`
    : `${config.server}${props.base}`;
  let list = [];

  for (let i = 0; i < options[2].list.length; i++) {
    let fullurl = url + `&year=${options[2].list[i]}`;
    const data = await fetch(fullurl, props.JWT !== "" ? getParam : null);
    const json = await data.json();
    list.push(json);
    console.log(json);
  }

  return list;
};
