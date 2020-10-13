import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  IconButton,
  Input,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import axios from 'axios';

const leaves = [
  'Paid leave',
  'Administrative leave',
  'Administrative force majeure leave',
  'Study leave',
  'Social leave',
  'Sick leave (with documents)',
  'Sick leave (no documents)',
];

const roles = ['BA lead', 'QA', 'Junior'];
const parts = ['Full', 'Fullest', 'Distance'];

const am = ['Anna Marie', 'John Smith', 'Bill Anderson', 'Nill Armstrong', 'Susane Incredible'];
const pm = [
  'Anney Kirillova',
  'Bill Ivanov',
  'Reygar Smith',
  'Kirill Retushev',
  'Yevheniy Enderov',
];

function NewRequest({ isOpen, onClose }) {
  const [leaveType, setLeaveType] = useState(0);
  const [role, setRole] = useState(0);
  const [part, setPart] = useState(0);
  const [comment, setComment] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [focusedFrom, setFocusFrom] = useState(false);
  const [focusedTo, setFocusTo] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [amanager, setAManager] = useState([]);
  const [pmanager, setPManager] = useState([]);
  const [isSendingRequest, setRequestSending] = useState(false);

  const getDateDifference = Math.round(toDate - fromDate) / (1000 * 60 * 60 * 24);

  const handleSendRequest = async () => {
    setRequestSending(true);
    await axios
      .post('https://url')
      .then((data) => {})
      .catch((err) => {});
    setRequestSending(false);
  };

  useEffect(() => {
    async function getAllData() {
      //await axios.get(url).then({data}=>) //axios request for all managers
      //axios request for all roles
      //axios request for all parts
      //axios request for all pm
    }
    getAllData();
  }, []);

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
        <DialogContent className="leave">
          <FormControl
            disabled={isSendingRequest}
            style={{ marginRight: 20, marginBottom: 20, width: '100%' }}>
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
              disabled={isSendingRequest}
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
              disabled={isSendingRequest}
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
            }}>
            <TextField
              disabled={isSendingRequest}
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

            <FormControl disabled={isSendingRequest} style={{ marginBottom: 20, width: '100%' }}>
              <InputLabel>Project Role</InputLabel>
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

            <FormControl disabled={isSendingRequest} style={{ marginBottom: 20, width: '100%' }}>
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

          <div>
            <h3>Approvers</h3>
            <ol className="approvers__list">
              <li>Accounting</li>
              <li>
                <FormControl disabled={isSendingRequest} className="approvers__item-form">
                  <InputLabel id="am-label">AM</InputLabel>
                  <Select
                    labelId="am-label"
                    multiple
                    value={amanager}
                    onChange={(e) => {
                      setAManager(e.target.value);
                    }}
                    input={<Input />}
                    //MenuProps={MenuProps}
                  >
                    {am.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={{ fontWeight: amanager.indexOf(name) === -1 ? '400' : '600' }}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {amanager.length > 0 && (
                  <Tooltip title="clear">
                    <IconButton
                      disabled={isSendingRequest}
                      className="clear-icon"
                      onClick={() => setAManager([])}>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </li>
              <li>
                <FormControl disabled={isSendingRequest} className="approvers__item-form">
                  <InputLabel id="pm-label">PM</InputLabel>
                  <Select
                    labelId="pm-label"
                    multiple
                    value={pmanager}
                    onChange={(e) => {
                      setPManager(e.target.value);
                    }}
                    input={<Input />}
                    //MenuProps={MenuProps}
                  >
                    {pm.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={{ fontWeight: pmanager.indexOf(name) === -1 ? '400' : '600' }}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {pmanager.length > 0 && (
                  <Tooltip title="clear">
                    <IconButton
                      disabled={isSendingRequest}
                      className="clear-icon"
                      onClick={() => setPManager([])}>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </li>
              <li>CEO</li>
            </ol>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className="new-request__ok-btn"
            variant="contained"
            disabled={isSendingRequest}
            onClick={handleSendRequest}>
            Send Request
          </Button>
          <Button
            className="new-request__cancel-btn"
            variant="contained"
            disabled={isSendingRequest}
            onClick={onClose}
            autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewRequest;
