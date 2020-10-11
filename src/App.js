import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import User from './pages/User';
import Login from './pages/Login';
import Admin from './pages/Admin';

import { Context } from './Context';

//only for external Header  user check
const user = localStorage.getItem('name');

function App() {
  const [context, setContext] = useState(user);
  return (
    <Context.Provider value={[context, setContext]}>
      <div>
        <Header />
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/admin" exact>
            <Admin />
          </Route>
          <Route path="/">
            <User />
          </Route>
        </Switch>
      </div>
    </Context.Provider>
  );
}

export default App;