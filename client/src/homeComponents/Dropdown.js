import React, { Component, useState } from "react";
import ReactDOM from "react-dom";

import { AutoComplete } from "antd";
import "antd/dist/antd.css";

import axios from "axios";
import { useEffect } from "react";

export const Dropdown = () => {
  const [dataSource, setDataSource] = useState([]);
  const [search, setSearch] = useState([]);

  const clearState = () => {
    const emptyData = [];
    setDataSource(emptyData);
  };

  const getTickerFromAPi = async (e) => {
    const response = await axios.get(
      `https://ticker-2e1ica8b9.now.sh/keyword/${e}`
    );
    const ArraysofData = response.data.map((f) => [f.symbol]);
    const flatArray = [].concat(...ArraysofData);

    setDataSource(flatArray);
  };

  const autoCompleteStyle = {
    width: "90%",
    background: "#3298dc",
    marginLeft: "5%",
  };


  const handleSearch = (e) => {
    if (e) {
      setSearch(e);
      getTickerFromAPi(e);
    } else {
      setSearch(e);
    }
  };

  async function getStock(stock) {
    window.location = `/${stock}`;
  }

  return (
    <div style={{ marginLeft: "3%" }}>
      <h2>Search for a ticker:</h2>
      <AutoComplete
        id={"autoCompId"}
        style={autoCompleteStyle}
        dropdownClassName={"d"}
        value={search}
        onChange={(e) => handleSearch(e)}
        onSelect={function (e) {
          getStock(e);
        }}
        dataSource={dataSource}
        placeholder="Search Up!"
      />
    </div>
  );
};
