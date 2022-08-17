import React from 'react';
import './App.css';
import Controls from './components/Controls';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Controls />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
