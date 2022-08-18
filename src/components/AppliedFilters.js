import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import PlanetsContext from '../context/PlanetsContext';

function AppliedFilters() {
  const { filters: { filterByNumericValues },
    removeNumericFilter } = useContext(PlanetsContext);
  return (
    <div className="applied-filters">
      <button
        type="button"
        onClick={ () => removeNumericFilter('removeAll') }
        data-testid="button-remove-filters"
      >
        Remover filtros
      </button>
      {filterByNumericValues.map(({ column, comparison, value }) => (
        <div key={ column } data-testid="filter" className="single-filter">
          <p>
            <span>
              {column}
              {' '}
            </span>
            <span>
              {comparison}
              {' '}
            </span>
            <span>{value}</span>
          </p>
          <button
            type="button"
            onClick={ () => removeNumericFilter(column) }
          >
            <FaTrash className="remove-filter-icon" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default AppliedFilters;
