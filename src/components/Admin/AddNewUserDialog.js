import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import axios from 'axios';

export default function AddNewUser({ isOpen, onClose, roles }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleAddNewUser = () => {
    let error = { ...errors };

    error.firstName = firstName !== '' ? '' : 'no empty First Name';
    error.lastName = lastName !== '' ? '' : 'no empty Last Name';
    error.email = email !== '' ? '' : 'no empty Email';
    error.password = password !== '' ? '' : 'no empty Password';

    setErrors(error);

    if (
      Object.values(error).reduce((sum, err) => {
        return sum + err.length;
      }, 0) > 0
    ) {
      return;
    }

    axios
      .post('http://localhost:3001/users/', {
        login: 'nill.smith@admin.com',
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role,
        vacations: [],
      })
      .then(() => onClose);
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Register new user</DialogTitle>
        <DialogContent>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <TextField
              label="First Name"
              error={errors.firstName.length > 0}
              helperText={errors.firstName}
              variant="standard"
              fullWidth
              className="form-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ marginBottom: 20, width: 300 }}
            />
            <TextField
              label="Last Name"
              error={errors.lastName.length > 0}
              helperText={errors.lastName}
              variant="standard"
              fullWidth
              className="form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ marginBottom: 20, width: 300 }}
            />
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
              type={'text'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: 20, width: 300 }}
            />
            <FormControl style={{ width: '100%' }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                }}>
                {roles.map((obj, idx) => (
                  <MenuItem key={`key-${idx}-name${obj}`} value={idx}>
                    {obj}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddNewUser} color="primary">
            Add
          </Button>
          <Button onClick={onClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
