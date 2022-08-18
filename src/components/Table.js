import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/Table.css';

function Table() {
  const { filteredAndSortedPlanets } = useContext(PlanetsContext);
  const tableHeaders = filteredAndSortedPlanets[0]
    ? Object.keys(filteredAndSortedPlanets[0])
    : [];
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
        {filteredAndSortedPlanets.map((planet) => (
          <tr key={ planet.name }>
            {tableHeaders.map((header) => {
              if (header === 'name') {
                return (
                  <td key={ planet.name } data-testid="planet-name">{planet.name}</td>
                );
              }
              return <td key={ planet[header] }>{planet[header]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
