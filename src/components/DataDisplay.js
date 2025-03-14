import React from "react";
import Chart from "./Chart";
import './DataDisplay.css';

function DataDisplay({ tourismData, chartType }) {
  if (chartType === "Table") {
    return (
      <div className="table-container">
        <h2 className="table-title">Tourism Data</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Time Period</th>
                <th>Visitors</th>
              </tr>
            </thead>
            <tbody>
              {tourismData.map((row, index) => (
                <tr key={index}>
                  <td>{row.Year || row.Month || row.Season}</td>
                  <td>{row.Visitors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <Chart tourismData={tourismData} chartType={chartType} />;
  }
}

export default DataDisplay;
