import React from 'react';
import FilterByName from './FilterByName';
import FilterByNumericValues from './FilterByNumericValues';

function Controls() {
  return (
    <div>
      <FilterByName />
      <FilterByNumericValues />
    </div>
  );
}

export default Controls;
