import PropTypes from 'prop-types';
import React from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { Provider } = PlanetsContext;
  return (
    <Provider value={ {} }>
      {children}
    </Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
