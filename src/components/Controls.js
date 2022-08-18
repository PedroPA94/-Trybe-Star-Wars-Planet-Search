import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/Controls.css';
import AppliedFilters from './AppliedFilters';
import FilterByName from './FilterByName';
import FilterByNumericValues from './FilterByNumericValues';
import SortControls from './SortControls';

function Controls() {
  const { filters: { filterByNumericValues } } = useContext(PlanetsContext);
  return (
    <div className="controls">
      <div className="filters">
        <FilterByName />
        <FilterByNumericValues />
        {filterByNumericValues.length > 0 && <AppliedFilters />}
      </div>
      <SortControls />
    </div>
  );
}

export default Controls;
