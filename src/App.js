import React from 'react';
import { Switch, Route } from 'react-router-dom';

import User from './pages/User';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/">
          <User />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
