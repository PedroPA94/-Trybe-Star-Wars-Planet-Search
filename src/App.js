import React from 'react';
import './App.css';
import Controls from './components/Controls';
import Header from './components/Header';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <Header />
      <Controls />
      <Table />
      {/* <Movie /> */}
    </div>
  );
}

export default App;
