import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const FilterOptions = ({ filters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
            value={filters.company}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Filter by location"
            value={filters.location}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="listDate"
            placeholder="Filter by list date"
            value={filters.listDate}
            onChange={handleInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
