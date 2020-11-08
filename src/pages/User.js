import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { Button, ButtonGroup } from '@material-ui/core';

import Home from './Home';
import MyRequests from './MyRequests';
import OtherRequests from './OtherRequests';

import { Context } from '../Context';
import NewRequest from './NewRequest';

const routes = [
  {
    name: 'Home',
    path: '/home',
    exact: true,
    access: ['Accountant', 'Manager', 'Employee'],
    main: () => <Home />,
  },
  {
    name: `My Requests`,
    path: '/my_requests',
    exact: true,
    access: ['Accountant', 'Manager', 'Employee'],
    main: () => <MyRequests />,
  },
  {
    name: 'Other Requests',
    path: '/other_requests',
    exact: true,
    access: ['Accountant', 'Manager'],
    main: () => <OtherRequests />,
  },
];

function User() {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [context, setContext] = useContext(Context);

  let history = useHistory();

  useEffect(() => {
    if (context.role === 'Admin') {
      history.replace('/admin');
      return;
    }

    setSelectedRoute(routes.findIndex((item) => item.path === history.location.pathname));
  }, [context, history.location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 65px)' }}>
      <div className="sidebar">
        <ButtonGroup orientation="vertical" style={{ width: '100%' }}>
          {routes.map((route, idx) => {
            if (route.access.includes(context.role))
              return (
                <Link key={`path-${route.name}-${idx}`} to={route.path}>
                  <Button
                    disableElevation
                    className="button"
                    variant={idx === selectedRoute ? 'contained' : 'text'}
                    color={idx === selectedRoute ? 'primary' : ''}
                    fullWidth
                    onClick={() => {
                      setSelectedRoute(idx);
                    }}>
                    {route.name}
                  </Button>
                </Link>
              );
          })}
        </ButtonGroup>
      </div>

      <div style={{ flex: 1, padding: '10px', height: '100%' }}>
        <Switch>
          {routes.map((route, index) => {
            if (route.access.includes(context.role))
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={({ location }) =>
                    context.token ? (
                      <route.main />
                    ) : (
                      <Redirect
                        to={{
                          pathname: '/login',
                          state: { from: location },
                        }}
                      />
                    )
                  }
                />
              );
          })}
          <Route
            path="/my_requests/:id"
            render={({ location }) =>
              context.token ? (
                <NewRequest isOpen={true}></NewRequest>
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: location },
                  }}
                />
              )
            }></Route>
          <Route path="*" children={<h2>Wrong way!</h2>}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default User;
