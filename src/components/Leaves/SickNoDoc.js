import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

import Approvers from './Approvers';
import LeaveComment from './LeaveComment';

const useTypes = [
  { id: 1, text: 'Half day' },
  { id: 2, text: 'Full day' },
];

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
          <Select value={duration} onChange={(e) => changeDuration(e.target.value)}>
            {useTypes.map((use, idx) => (
              <MenuItem key={`use-${use.text}-idx-${idx}`} value={use.id}>
                {use.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <LeaveComment disabled={isSendingRequest} comment={comment} changeComment={changeComment} />

      <Approvers />
    </div>
  );
}

export default SickNoDoc;
