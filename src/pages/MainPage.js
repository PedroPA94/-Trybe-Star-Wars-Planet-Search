import React from 'react';
import { Link } from 'react-router-dom';
import Controls from '../components/Controls';
import Header from '../components/Header';
import Table from '../components/Table';
import '../styles/MainPage.css';

function MainPage() {
  return (
    <div className="page">
      <Header />
      <Controls />
      <Table />
      <Link to="/movie" className="link-to-movie">Watch movie</Link>
    </div>
  );
}

export default MainPage;
