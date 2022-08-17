import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function AppliedFilters() {
  const { filters: { filterByNumericValues },
    removeNumericFilter } = useContext(PlanetsContext);
  return (
    <div>
      <button
        type="button"
        onClick={ () => removeNumericFilter('removeAll') }
        data-testid="button-remove-filters"
      >
        Remover todos os filtros
      </button>
      {filterByNumericValues.map(({ column, comparison, value }) => (
        <div key={ column } data-testid="filter">
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
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default AppliedFilters;
