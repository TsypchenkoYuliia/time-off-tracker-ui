import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button, Avatar, Menu, MenuItem } from '@material-ui/core';

import { Context } from '../Context';

function Header() {
  const [anchor, setAnchor] = useState(null);

  const [context, setContext] = useContext(Context);

  let history = useHistory();

  const handleClickAvatar = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('name');
    setContext(localStorage.getItem('name'));
    history.push('/login');
  };

  const toHomePage = () => {
    history.push('/');
  };

  useEffect(() => {
    console.log(localStorage.getItem('name'));
  }, [context]);

  //пофиксить появление меню...может стрикт мод?
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <h2 className="title" onClick={toHomePage}>
            Vacation
          </h2>
          {context ? (
            <>
              <Avatar
                src="https://gagadget.com/media/post_big/The_Elder_Scrolls_V_Skyrim.jpg"
                onClick={handleClickAvatar}>
                {context.substr(0, 2).toUpperCase()}
              </Avatar>
              <Menu
                elevation={5}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={handleCloseMenu}>
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button style={{ backgroundColor: 'white' }} onClick={() => history.push('/login')}>
              Log in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default React.memo(Header);
