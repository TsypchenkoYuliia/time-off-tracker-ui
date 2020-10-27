import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TextField, Typography, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';

import { Context } from '../Context';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const MASTER_EMAIL = 'admin@admin.com';
const MASTER_PASSWORD = 'admin123';

const USER_EMAIL = 'user@admin.com';
const USER_PASSWORD = 'admin123';

function Login() {
  let history = useHistory();
  let location = useLocation();

  const [context, setContext] = useContext(Context);

  const [email, setEmail] = useState(USER_EMAIL); //'mainadmin@mail.ru'
  const [password, setPassword] = useState(USER_PASSWORD); //'mainadmin89M#'
  const [showPassword, setPasswordVisibility] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    console.log(location);
  }, []);

  const checkForm = () => {
    let error = { ...errors };

    error.email =
      email !== ''
        ? emailRegex.test(email)
          ? ''
          : 'invalid email address'
        : 'no empty email address';

    error.password =
      password !== ''
        ? password.length < 6
          ? 'minimum 6 characaters required'
          : ''
        : 'no empty password';

    setErrors(error);

    if (
      Object.values(error).reduce((sum, err) => {
        return sum + err.length;
      }, 0) > 0
    ) {
      return;
    }

    //Работает шикарно, добавить осталось только добавление тела ошибки в нужную секцию ошибок
    // const url = 'https://localhost:44381/auth/token';
    // axios
    //   .post(url, { username: email, password: password })
    //   .then((response) => {
    //     const { data } = response;
    //     console.log(response);
    //     localStorage.setItem('userId', data.userId);
    //     localStorage.setItem('role', data.role); //data.role
    //     localStorage.setItem('token', data.token);
    //     setContext({ userId: data.userId, role: data.role, token: data.token });
    //   })
    //   .catch((err) => console.log(err.response.data));

    //тут будет запрос на проверку почты и пароля через аксиос
    if (email === MASTER_EMAIL && password === MASTER_PASSWORD) {
      localStorage.setItem('userId', '1');
      localStorage.setItem('role', 'Admin'); //data.role
      localStorage.setItem('token', 'token');
      setContext({ userId: '1', role: 'Admin', token: 'token' });
      history.replace(location.state ? location.state.from.pathname : '/admin');
    } else if (email === USER_EMAIL && password === USER_PASSWORD) {
      localStorage.setItem('userId', '1');
      localStorage.setItem('role', 'User'); //data.role
      localStorage.setItem('token', 'token');
      setContext({ userId: '1', role: 'User', token: 'token' });
      history.replace(location.state ? location.state.from.pathname : '/home');
    }
  };

  const handleClickShowPassword = () => {
    setPasswordVisibility(!showPassword);
  };

  if (context.role) history.push('/');

  return (
    <div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px',
        }}>
        <Typography
          variant="h4"
          align="center"
          style={{
            marginBottom: 10,
            color: 'blue',
          }}>
          Login
        </Typography>
        <TextField
          label="Email"
          error={errors.email.length > 0}
          helperText={errors.email}
          variant="standard"
          fullWidth
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 20, width: 300 }}
        />
        <TextField
          label="Password"
          error={errors.password.length > 0}
          helperText={errors.password}
          variant="standard"
          fullWidth
          className="form-input"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: 20, width: 300 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: 20, width: 150 }}
          onClick={checkForm}>
          Log In
        </Button>
      </form>
    </div>
  );
}

export default React.memo(Login);
