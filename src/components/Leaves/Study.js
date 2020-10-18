import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import Signers from './Signers';

function Study({
  prManagers,
  isSendingRequest,
  comment,
  changeComment,
  fromDate,
  changeFromDate,
  toDate,
  changeToDate,
  managers,
  changeManagers,
}) {
  const [focusedFrom, setFocusFrom] = useState(false);
  const [focusedTo, setFocusTo] = useState(false);

  const getDateDifference = Math.round(toDate - fromDate) / (1000 * 60 * 60 * 24);

  const mapping = React.useCallback(
    (managers) => {
      return (
        <>
          {managers.map((manager, idx) => {
            return (
              <Signers
                key={`sign-idx-${idx}`}
                idx={idx}
                options={prManagers}
                managers={managers}
                onChange={changeManagers}
                isDisabled={isSendingRequest}
              />
            );
          })}
        </>
      );
    },
    [isSendingRequest],
  );

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
          isDayBlocked={(day) => (toDate ? day > toDate : null)}
          numberOfMonths={1}
          date={fromDate}
          onDateChange={(date) => changeFromDate(date)}
          focused={focusedFrom}
          onFocusChange={({ focused }) => setFocusFrom(focused)}
        />

        <SingleDatePicker
          id="dateTo"
          disabled={isSendingRequest}
          showClearDate
          placeholder="To"
          isDayBlocked={(day) => (fromDate ? day < fromDate : null)}
          numberOfMonths={1}
          date={toDate}
          onDateChange={(date) => changeToDate(date)}
          focused={focusedTo}
          onFocusChange={({ focused }) => setFocusTo(focused)}
        />

        {fromDate && toDate && getDateDifference >= 0 ? (
          <h4 style={{ paddingTop: 3 }}>
            {getDateDifference + 1} vacation {getDateDifference === 0 ? 'day' : 'days'}
          </h4>
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
          onChange={(e) => changeComment(e)}
          style={{ marginBottom: 20, width: '100%' }}
        />
      </div>

      <div>
        <h3>Approvers</h3>
        <ol className="approvers__list">
          <li>Accounting</li>
          {mapping(managers)}
        </ol>
      </div>
    </div>
  );
}

export default Study;
