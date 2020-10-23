import React from 'react';
import { TextField } from '@material-ui/core';

function LeaveComment({ disabled, comment, changeComment }) {
  return (
    <TextField
      disabled={disabled}
      label="Comment"
      variant="standard"
      fullWidth
      multiline
      className="form-input"
      value={comment}
      onChange={(e) => changeComment(e)}
      style={{ marginBottom: 20, marginTop: 20, width: '100%' }}
    />
  );
}

export default LeaveComment;
