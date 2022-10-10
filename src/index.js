import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import PlanetsProvider from './context/PlanetsProvider';

ReactDOM.render(
  <HashRouter>
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  </HashRouter>,
  document.getElementById('root'),
);
