import React, { useState } from 'react';
import {
  TextField,
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

function Paid({ prRoles, prParticipation, prManagers, isSendingRequest }) {
  const [role, setRole] = useState(0);
  const [part, setPart] = useState(0);
  const [comment, setComment] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [focusedFrom, setFocusFrom] = useState(false);
  const [focusedTo, setFocusTo] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [pmanager, setPManager] = useState([]);

  const getDateDifference = Math.round(toDate - fromDate) / (1000 * 60 * 60 * 24);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 20,
          alignItems: 'center',
        }}>
        <SingleDatePicker
          id="dateFrom"
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
          id="dateTo"
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
            {prRoles.map((item, idx) => (
              <MenuItem key={`role-${item}-${idx}`} value={idx}>
                {item}
              </MenuItem>
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
            {prParticipation.map((item, idx) => (
              <MenuItem key={`part-${item}-${idx}`} value={idx}>
                {item}
              </MenuItem>
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
                {prManagers.map((name) => (
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
    </div>
  );
}

export default Paid;
