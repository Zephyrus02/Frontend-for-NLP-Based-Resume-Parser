import React, { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const FilterOptions = ({ filters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      company: "",
      location: "",
      listDate: "",
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="filter-container">
      <button className="filter-toggle" onClick={toggleFilters}>
        <FaFilter /> Filter
      </button>
      {showFilters && (
        <div className="filter-options">
          <input
            type="text"
            name="company"
            placeholder="Filter by company"
            value={localFilters.company}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Filter by location"
            value={localFilters.location}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="listDate"
            placeholder="Filter by list date"
            value={localFilters.listDate}
            onChange={handleInputChange}
          />
          <div className="filter-buttons">
            <button className="apply-filter" onClick={applyFilters}>
              Apply
            </button>
            <button className="clear-filter" onClick={clearFilters}>
              <FaTimes /> Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
