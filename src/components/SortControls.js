import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SortControls() {
  const [selectedSort, setSelectedSort] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });
  const { setSortPlanets } = useContext(PlanetsContext);
  const columnsOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const { order } = selectedSort;
  return (
    <form>
      <label htmlFor="column-sort">
        Coluna:
        <select
          id="column-sort"
          name="column"
          data-testid="column-sort"
          value={ order.column }
          onChange={ ({ target }) => setSelectedSort({
            order: { ...order, column: target.value } }) }
        >
          {columnsOptions.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>
      </label>
      <label htmlFor="sort-order">
        Ordenar:
        <input
          type="radio"
          name="sort-order"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ ({ target }) => setSelectedSort({
            order: { ...order, sort: target.value } }) }
        />
        <input
          type="radio"
          name="sort-order"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ ({ target }) => setSelectedSort({
            order: { ...order, sort: target.value } }) }
        />
      </label>
      <button
        type="button"
        onClick={ () => setSortPlanets(selectedSort) }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </form>
  );
}

export default SortControls;
