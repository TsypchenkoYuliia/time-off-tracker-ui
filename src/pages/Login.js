import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Typography, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const MASTER_EMAIL = 'admin@admin.com';
const MASTER_PASSWORD = 'admin123';

function Login() {
  let history = useHistory();

  const [email, setEmail] = useState(MASTER_EMAIL);
  const [password, setPassword] = useState(MASTER_PASSWORD);
  const [showPassword, setPasswordVisibility] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

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

    //тут будет запрос на проверку почты и пароля через аксиос
    if (email === MASTER_EMAIL && password === MASTER_PASSWORD) {
      localStorage.setItem('name', 'admin');
    }
  };

  const handleClickShowPassword = () => {
    setPasswordVisibility(!showPassword);
  };

  if (localStorage.getItem('name')) history.replace('/');

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

export default Login;
