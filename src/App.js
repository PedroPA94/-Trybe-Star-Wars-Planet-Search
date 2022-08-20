import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import MainPage from './pages/MainPage';
import WatchMovie from './pages/WatchMovie';
import './styles/pageTransition.css';

// CSS Transitions from https://www.youtube.com/watch?v=tOusa012Fus&t=1527s&ab_channel=CoderOne
const transition = { enter: 800, exit: 400 };

function App() {
  const [path, setPath] = useState('/');
  const [click, setClick] = useState(0);
  window.onclick = () => setClick(click + 1);

  useEffect(() => { setPath(window.location.pathname); }, [click]);

  return (
    <TransitionGroup component="div" className="App">
      <CSSTransition
        key={ path.split('/')[1] || '/' }
        timeout={ transition }
        classNames="pageSlider"
        mountOnEnter={ false }
        unmountOnExit
      >
        <div className={ path === '/' ? 'right' : 'left' }>
          <Switch>
            <Route exact path="/" component={ MainPage } />
            <Route path="/movie" component={ WatchMovie } />
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
