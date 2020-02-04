import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import List from './pages/Users/List/List';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/users/list" />
          </Route>
          <Route path="/users/list" component={List} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
