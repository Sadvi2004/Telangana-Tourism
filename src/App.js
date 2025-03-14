import React, { useEffect, useState } from "react";
import axios from "axios";
import DistrictSelector from "./components/DistrictSelector";
import DataDisplay from "./components/DataDisplay";
import "./App.css";

const BASE_URL = "http://127.0.0.1:5000";

function App() {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [dataType, setDataType] = useState("Total Visitors");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [chartType, setChartType] = useState("Table");
  const [tourismData, setTourismData] = useState([]);

  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const seasons = [
    "",
    "Winter (Dec-Feb)",
    "Summer (Mar-May)",
    "Monsoon (Jun-Sep)",
    "Post-Monsoon (Oct-Nov)",
  ];
  const years = Array.from({ length: 2024 - 2020 }, (_, i) => 2020 + i);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/districts`)
      .then((response) => {
        setDistricts(["All Districts", ...response.data.districts]);
      })
      .catch((error) => console.error("Error fetching districts:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tourism-data`, {
        params: {
          district: selectedDistrict,
          dataType,
          selectedMonth,
          selectedYear,
          selectedSeason,
        },
      })
      .then((response) => {
        setTourismData(response.data);
      })
      .catch((error) => console.error("Error fetching tourism data:", error));
  }, [selectedDistrict, dataType, selectedMonth, selectedYear, selectedSeason]);

  return (
    <div className="container">
      <h1 className="title">Telangana Tourism Dashboard</h1>

      <DistrictSelector
        districts={districts}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
      />

      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">Data Type:</label>
          <select
            className="filter-select"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
          >
            <option>Total Visitors</option>
            <option>Domestic Visitors</option>
            <option>Foreign Visitors</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Month:</label>
          <select
            className="filter-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month || "Select Month"}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Year:</label>
          <select
            className="filter-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Season:</label>
          <select
            className="filter-select"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            {seasons.map((season, index) => (
              <option key={index} value={season}>
                {season || "Select Season"}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Visualization Type:</label>
          <select
            className="filter-select"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option>Table</option>
            <option>Bar Chart</option>
            <option>Line Chart</option>
          </select>
        </div>
      </div>

      <DataDisplay tourismData={tourismData} chartType={chartType} />
    </div>
  );
}

export default App;
