import React, { useContext } from 'react';
import './App.css';
import AppliedFilters from './components/AppliedFilters';
import Controls from './components/Controls';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const { filters: { filterByNumericValues } } = useContext(PlanetsContext);
  return (
    <>
      <Controls />
      {filterByNumericValues.length > 0 && <AppliedFilters />}
      <Table />
    </>
  );
}

export default App;
