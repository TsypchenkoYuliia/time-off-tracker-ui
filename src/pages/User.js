import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { Button, ButtonGroup } from '@material-ui/core';

import Home from './Home';
import MyRequests from './MyRequests';
import OtherRequests from './OtherRequests';

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
];

function User() {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('name'));

  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('name')) {
      history.push('/login');
    }

    setSelectedRoute(routes.findIndex((item) => item.path === history.location.pathname));
  }, [history.location.pathname]);

  if (!localStorage.getItem('name')) {
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
