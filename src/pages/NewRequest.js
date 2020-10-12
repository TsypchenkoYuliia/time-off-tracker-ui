import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

const leaves = [
  'Paid leave',
  'Administrative Leave',
  'Administrative force majeure leave',
  'Study leave',
  'Social leave',
  'Sick leave (with documents)',
  'Sick leave (no documents)',
];

const roles = ['BA lead', 'QA', 'Junior'];
const parts = ['Full', 'Fullest'];

function NewRequest({ isOpen, onClose }) {
  const [leaveType, setLeaveType] = useState(0);
  const [role, setRole] = useState(0);
  const [part, setPart] = useState(0);
  const [comment, setComment] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [focusedFrom, setFocusFrom] = useState(false);
  const [focusedTo, setFocusTo] = useState(false);
  const [toDate, setToDate] = useState(null);

  const dateDifference = moment.duration(moment(toDate).diff(moment(fromDate))).days();
  const getDateDifference = Math.round(toDate - fromDate) / (1000 * 60 * 60 * 24);

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        onClose={onClose}
        aria-labelledby="new-request-title"
        aria-describedby="new-request-description">
        <DialogTitle id="new-request-title">New Request</DialogTitle>
        <DialogContent>
          <FormControl style={{ marginRight: 20, marginBottom: 20, width: '100%' }}>
            <InputLabel>Leave Type</InputLabel>
            <Select
              value={leaveType}
              onChange={(e) => {
                setLeaveType(e.target.value);
              }}>
              {leaves.map((type, idx) => (
                <MenuItem value={idx}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <SingleDatePicker
              showClearDate
              placeholder="From"
              //transitionDuration={5000} WTF!
              isDayBlocked={(day) => (toDate ? day > toDate : null)}
              numberOfMonths={1}
              date={fromDate}
              onDateChange={(date) => setFromDate(date)}
              focused={focusedFrom}
              onFocusChange={({ focused }) => setFocusFrom(focused)}
            />

            <SingleDatePicker
              showClearDate
              placeholder="To"
              //transitionDuration={5} WTF!
              isDayBlocked={(day) => (fromDate ? day < fromDate : null)}
              numberOfMonths={1}
              date={toDate}
              onDateChange={(date) => setToDate(date)}
              focused={focusedTo}
              onFocusChange={({ focused }) => setFocusTo(focused)}
            />

            {fromDate && toDate && getDateDifference >= 0 ? (
              <h4 style={{ paddingTop: 3 }}>
                {getDateDifference + 1} {console.log(getDateDifference)} дней отпуска
              </h4> //написать функцию склонения День
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '500px',
              minHeight: '500px',
            }}>
            <TextField
              label="Comment"
              variant="standard"
              fullWidth
              multiline
              className="form-input"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              style={{ marginBottom: 20, width: '100%' }}
            />

            <FormControl style={{ marginBottom: 20, width: '100%' }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}>
                {roles.map((item, idx) => (
                  <MenuItem value={idx}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ marginBottom: 20, width: '100%' }}>
              <InputLabel>Project participation</InputLabel>
              <Select
                value={part}
                onChange={(e) => {
                  setPart(e.target.value);
                }}>
                {parts.map((item, idx) => (
                  <MenuItem value={idx}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}} color="primary">
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

export default NewRequest;
