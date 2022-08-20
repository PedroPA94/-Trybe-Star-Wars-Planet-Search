import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import PlanetsProvider from './context/PlanetsProvider';

ReactDOM.render(
  <BrowserRouter>
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
