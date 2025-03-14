import React from "react";
import "./DistrictSelector.css";

function DistrictSelector({ districts, selectedDistrict, setSelectedDistrict }) {
  return (
    <div className="district-selector">
      <label>Select District:</label>
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
      >
        {districts.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DistrictSelector;
