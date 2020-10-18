import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

const useTypes = ['Full day', 'Half day'];

function SickNoDoc({
  isSendingRequest,
  comment,
  changeComment,
  fromDate,
  changeFromDate,
  toDate,
  changeToDate,
  duration,
  changeDuration,
}) {
  const [focusedFrom, setFocusFrom] = useState(false);
  const [focusedTo, setFocusTo] = useState(false);

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
          numberOfMonths={1}
          date={fromDate}
          onDateChange={(date) => {
            changeFromDate(date);
            changeToDate(date);
          }}
          focused={focusedFrom}
          onFocusChange={({ focused }) => setFocusFrom(focused)}
        />

        <SingleDatePicker
          id="dateTo"
          disabled={isSendingRequest}
          showClearDate
          placeholder="To"
          numberOfMonths={1}
          date={fromDate}
          onDateChange={(date) => {
            changeFromDate(date);
            changeToDate(date);
          }}
          focused={focusedTo}
          onFocusChange={({ focused }) => setFocusTo(focused)}
        />

        <FormControl className="sick-no-doc__use">
          <InputLabel>Use</InputLabel>
          <Select
            value={duration === useTypes[0] ? 0 : 1}
            onChange={(e) => changeDuration(e.target.value)}>
            {useTypes.map((use, idx) => (
              <MenuItem key={`use-${use}-idx-${idx}`} value={idx}>
                {use}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          onChange={(e) => changeComment(e)}
          style={{ marginBottom: 20, width: '100%' }}
        />
      </div>

      <div>
        <h3>Approvers</h3>
        <ol className="approvers__list">
          <li>Accounting</li>
        </ol>
      </div>
    </div>
  );
}

export default SickNoDoc;
