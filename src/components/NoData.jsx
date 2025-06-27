import React from "react";
import "../styles/NoData.css";

const NoData = ({ message = "No data available." }) => {
  return <div className="no-data">{message}</div>;
};

export default NoData;
