import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredPlanets, setFilteredPlanets] = useState([]);

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
        setFilteredPlanets(planetsFiltered);
      } catch (error) {
        console.log(error);
      }
    };
    getPlanets();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const { filterByName } = filters;
      const planetsByName = planets.filter(({ name }) => (
        name.toLowerCase().includes(filterByName.name.toLowerCase())));
      setFilteredPlanets(planetsByName);
    };
    applyFilters();
  }, [filters]);

  const addFilters = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const { Provider } = PlanetsContext;
  return (
    <Provider value={ { filteredPlanets, addFilters, filters } }>
      {children}
    </Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
