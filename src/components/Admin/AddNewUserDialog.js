import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import axios from 'axios';

export default function AddNewUser({ isOpen, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('Employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    password: '',
  });

  const handleAddNewUser = () => {
    axios
      .post('http://localhost:3001/users/', {
        login: 'nill.smith@admin.com',
        email: email,
        password: password,
        firstName: 'Nill',
        lastName: 'Smith',
        role: 'Manager',
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
