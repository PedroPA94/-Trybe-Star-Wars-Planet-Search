import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      try {
        const response = await fetch(endpoint);
        const { results } = await response.json();
        const planetsFiltered = results.map((planet) => {
          delete planet.residents;
          return planet;
        });
        setPlanets(planetsFiltered);
      } catch (error) {
        console.log(error);
      }
    };
    getPlanets();
  }, []);

  const { Provider } = PlanetsContext;
  return (
    <Provider value={ { planets } }>
      {children}
    </Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
