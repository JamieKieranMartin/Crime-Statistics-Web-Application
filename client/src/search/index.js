import React, { useState, useEffect } from "react";
import { useDataObject } from "../components/getapi";
import { Filter } from "./components/filter";
import { Item } from "./components/item";
import { Sort } from "./components/sort";
import { SearchBar } from "./components/searchbar";
import { PieChart } from "./components/piechart";
import { Map } from "./components/map";
import { options } from "./components/options";
import { SortList, SearchList } from "./functions/functions";
import { Link } from "react-router-dom";

export function LoadSearch(props) {
  const [list, setList] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(props.location.search);
  const [filter, setFilter] = useState([
    { value: "Gender", filters: "" },
    { value: "Age", filters: "" },
    { value: "Year", filters: "" },
    { value: "Month", filters: "" }
  ]);

  const { loading, object, error } = useDataObject({
    base: props.location.pathname,
    query: query,
    JWT: props.JWT
  });

  useEffect(() => {
    let bufferList = object.result;
    if (bufferList !== undefined) {
      // Adapted from https://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
      const toDelete = new Set([0]);
      bufferList = bufferList.filter(obj => !toDelete.has(obj.total));
    }
    if (search !== "") {
      bufferList = SearchList(bufferList, search);
    }
    if (sort !== "") {
      bufferList = SortList(bufferList, sort);
    }
    setList(bufferList);
  }, [object.result]);

  const handleSearchChange = e => {
    setSearch(e.target.value);
    setList(SortList(SearchList(object.result, e.target.value), sort));
  };

  const handleSortChange = e => {
    setSort(e.target.value);
    setList(SortList(list, e.target.value));
  };

  useEffect(() => {
    let findQuery = props.location.search;
    filter.map(
      item =>
        (findQuery +=
          item.filters !== ""
            ? `&${item.value.toLowerCase()}=${item.filters}`
            : "")
    );
    setQuery(findQuery);
  }, [filter]);

  const handleFilterChange = e => {
    e.persist();
    setFilter(oldFilter =>
      oldFilter.map(item =>
        e.target.name === item.value
          ? { ...item, filters: e.target.value }
          : item
      )
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center middle">
        <div className="spinner-border">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (object.error || error) {
    return (
      <p>
        Something went wrong: {object.error} {error}
      </p>
    );
  }

  if (list !== []) {
    return (
      <div className="list-group">
          <h1 className="py-3">{object.query.offence}</h1>
        <div className="list-group-item d-flex flex-wrap align-items-center nopadding mb-2">
          <PieChart title={object.query.offence} list={list} />
          <Map list={list} />
        </div>

        <div className="input-group mb-2">
          <SearchBar search={search} handleSearchChange={handleSearchChange} />
          <Sort sort={sort} handleSortChange={handleSortChange} />
        </div>
        <div className="input-group mb-2">
          {options.map((item, filter) => (
            <Filter
              options={item}
              value={filter.filters}
              handleFilterChange={handleFilterChange}
            />
          ))}
        </div>
        {list.map(item => (
          <Item key={item.LGA} item={item} offence={object.query.offence} />
        ))}
      </div>
    );
  } else {
    return <div className="list-group">Please Refresh The Page</div>;
  }
}
