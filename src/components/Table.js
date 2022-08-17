import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const tableHeaders = planets[0] ? Object.keys(planets[0]) : [];
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
        {planets.map((planet) => (
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
