import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DualAxes } from "@ant-design/plots";

const DemoDualAxes = ({ data }) => {
  const config = {
    data: [data, data],
    xField: "address",
    yField: ["value", "count"],
    geometryOptions: [
      {
        geometry: "column",
      },
      {
        geometry: "line",
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };
  return <DualAxes {...config} />;
};
export default DemoDualAxes;
