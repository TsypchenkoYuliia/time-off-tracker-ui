import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { Button, ButtonGroup } from '@material-ui/core';

import Home from './Home';
import MyRequests from './MyRequests';
import OtherRequests from './OtherRequests';
import NewRequest from './NewRequest';

import { Context } from '../Context';

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    main: () => <Home />,
  },
  {
    name: `My Requests`,
    path: '/my_requests',
    exact: true,
    main: () => <MyRequests />,
  },
  {
    name: 'Other Requests',
    path: '/other_requests',
    exact: true,
    main: () => <OtherRequests />,
  },
  {
    name: 'New Request',
    path: '/new_request',
    exact: true,
    main: () => <NewRequest />,
  },
];

function User() {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [context, setContext] = useContext(Context);

  let history = useHistory();

  useEffect(() => {
    if (!context) {
      history.push('/login');
    }

    setSelectedRoute(routes.findIndex((item) => item.path === history.location.pathname));
  }, [context, history.location.pathname]);

  if (!context) {
    history.push('/login');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 65px)' }}>
      <div className="sidebar">
        <ButtonGroup orientation="vertical" style={{ width: '100%' }}>
          {routes.map((route, idx) => {
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
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} children={<route.main />} />
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default User;
