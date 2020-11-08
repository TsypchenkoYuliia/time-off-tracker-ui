import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationDialog({ isOpen, onClose, onDelete, user }) {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">{'Delete user'}</DialogTitle>
        <DialogContent>
          <span className="alert-dialog-description">
            Are you sure want to delete <b>{user && user[1]}</b>?
          </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onDelete(user[0])} color="primary">
            OK
          </Button>
          <Button onClick={onClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
