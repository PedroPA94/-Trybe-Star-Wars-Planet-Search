import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import AppliedFilters from './AppliedFilters';
import FilterByName from './FilterByName';
import FilterByNumericValues from './FilterByNumericValues';

function Controls() {
  const { filters: { filterByNumericValues } } = useContext(PlanetsContext);
  return (
    <div>
      <FilterByName />
      <FilterByNumericValues />
      {filterByNumericValues.length > 0 && <AppliedFilters />}
    </div>
  );
}

export default Controls;
