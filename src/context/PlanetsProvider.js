import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredAndSortedPlanets, setFilteredAndSortedPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [sortPlanets, setSortPlanets] = useState({
    order: { column: 'population', sort: 'ASC' },
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
        setFilteredAndSortedPlanets(planetsFiltered);
      } catch (error) {
        console.log(error);
      }
    };
    getPlanets();
  }, []);

  const applySortToFilteredPlanets = (listOfPlanets) => {
    const { column, sort } = sortPlanets.order;
    const setUnknownValuesLast = -1;
    return listOfPlanets.sort((a, b) => {
      if (b[column] === 'unknown') {
        return setUnknownValuesLast;
      }
      if (sort === 'DESC') {
        return parseInt(b[column], 10) - parseInt(a[column], 10);
      }
      return parseInt(a[column], 10) - parseInt(b[column], 10);
    });
  };

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
            default:
              return parseInt(planet[column], 10) === parseInt(value, 10);
            }
          });
        });
      }
      const newFilteredAndSortedPlanets = applySortToFilteredPlanets(newFilteredPlanets);
      setFilteredAndSortedPlanets(newFilteredAndSortedPlanets);
    };
    applyFiltersToPlanets();
  }, [filters, sortPlanets]);

  const addFilters = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const addNewColumnFilter = (column) => {
    setFilteredColumns([...filteredColumns, column]);
  };

  const removeNumericFilter = (column) => {
    const { filterByNumericValues } = filters;
    let updatedFilter = [];
    if (column !== 'removeAll') {
      updatedFilter = filterByNumericValues
        .filter((filter) => filter.column !== column);
    }
    setFilters({
      ...filters,
      filterByNumericValues: updatedFilter,
    });
  };

  const { Provider } = PlanetsContext;
  return (
    <Provider
      value={ { filteredAndSortedPlanets,
        addFilters,
        filters,
        filteredColumns,
        addNewColumnFilter,
        removeNumericFilter,
        setSortPlanets } }
    >
      {children}
    </Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
