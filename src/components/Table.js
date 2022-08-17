import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { filteredPlanets } = useContext(PlanetsContext);
  const tableHeaders = filteredPlanets[0] ? Object.keys(filteredPlanets[0]) : [];
  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={ header }>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            {tableHeaders.map((header) => (
              <td key={ header }>{planet[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
