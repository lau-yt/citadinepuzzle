import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import i18n from './config/i18n';
import Game from './pages/Game';
import Landing from './pages/Landing';

function App() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <button onClick={() => changeLanguage('es')}>es</button>
      <button onClick={() => changeLanguage('en')}>en</button>
      <Router>
        <div>
          <Switch>
            <Route path="/juego">
              <Game />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
