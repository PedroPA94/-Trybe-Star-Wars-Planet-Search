import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import WatchMovie from './pages/WatchMovie';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ MainPage } />
        <Route path="/movie" component={ WatchMovie } />
      </Switch>
    </div>
  );
}

export default App;
