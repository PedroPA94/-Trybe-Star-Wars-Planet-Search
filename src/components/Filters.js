import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const [name, setName] = useState('');
  const { addFilters } = useContext(PlanetsContext);
  return (
    <div>
      <label htmlFor="name-filter">
        Filtre por nome:
        <input
          type="text"
          value={ name }
          data-testid="name-filter"
          id="name-filter"
          onChange={ (event) => {
            setName(event.target.value);
            addFilters('filterByName', { name: event.target.value });
          } }
        />
      </label>
    </div>
  );
}

export default Filters;
