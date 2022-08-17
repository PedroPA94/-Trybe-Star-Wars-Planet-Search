import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <span>Hello, App!</span>
    </PlanetsProvider>
  );
}

export default App;
