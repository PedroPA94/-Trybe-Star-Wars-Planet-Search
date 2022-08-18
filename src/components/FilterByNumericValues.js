import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterByNumericValues() {
  const [newFilter, setNewFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const { addFilters, filters, filteredColumns,
    addNewColumnFilter } = useContext(PlanetsContext);

  const columnsOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const columnsSelect = columnsOptions.filter((option) => (
    !filteredColumns.includes(option)
  ));
  const comparisonSelect = ['maior que', 'menor que', 'igual a'];

  const prevFilters = filters.filterByNumericValues;

  useEffect(() => {
    setNewFilter({
      ...newFilter,
      column: columnsSelect[0],
    });
  }, [filteredColumns]);

  const handleChange = ({ target }) => {
    setNewFilter({
      ...newFilter,
      [target.name]: target.value,
    });
  };

  return (
    <form>
      <label htmlFor="column">
        Coluna:
        <select
          id="column"
          name="column"
          data-testid="column-filter"
          value={ newFilter.column }
          onChange={ (event) => handleChange(event) }
        >
          {columnsSelect.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        Operador:
        <select
          id="comparison"
          name="comparison"
          data-testid="comparison-filter"
          value={ newFilter.comparison }
          onChange={ (event) => handleChange(event) }
        >
          {comparisonSelect.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>
      </label>
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          id="value"
          name="value"
          data-testid="value-filter"
          value={ newFilter.value }
          onChange={ (event) => handleChange(event) }
          required
        />
      </label>
      <button
        type="button"
        onClick={ () => {
          addFilters('filterByNumericValues', [...prevFilters, newFilter]);
          addNewColumnFilter(newFilter.column);
        } }
        data-testid="button-filter"
      >
        Adicionar filtro
      </button>
    </form>
  );
}

export default FilterByNumericValues;
