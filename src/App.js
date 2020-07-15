import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import List from './pages/Users/List/ListHOC';
import Create from './pages/Users/Create/CreateHOC';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/">
            <Redirect to="/list" />
          </Route> */}
          <Route path="/list" component={List} />
          {/* <Route path="/new" component={Create} />
          <Route path="/edit/:userId" component={Create} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
