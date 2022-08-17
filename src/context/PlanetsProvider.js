import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });

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
    const applyFiltersToPlanets = () => {
      const { filterByName, filterByNumericValues } = filters;
      let newFilteredPlanets = planets.filter(({ name }) => (
        name.toLowerCase().includes(filterByName.name.toLowerCase())));
      if (filterByNumericValues.length > 0) {
        filterByNumericValues.forEach((filter) => {
          const { column, comparison, value } = filter;
          newFilteredPlanets = newFilteredPlanets.filter((planet) => {
            switch (comparison) {
            case 'maior que':
              return parseInt(planet[column], 10) > parseInt(value, 10);
            case 'menor que':
              return parseInt(planet[column], 10) < parseInt(value, 10);
            case 'igual a':
              return parseInt(planet[column], 10) === parseInt(value, 10);
            default:
              return true;
            }
          });
        });
      }
      setFilteredPlanets(newFilteredPlanets);
    };
    applyFiltersToPlanets();
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
