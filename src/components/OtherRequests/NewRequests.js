import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@material-ui/core';

import VacationPeriod from '../Leaves/VacationPeriod';

const types = [
  {
    id: 0,
    title: 'Any',
  },
  {
    id: 1,
    title: 'Administrative force majeure leave',
  },
  { id: 2, title: 'Administrative leave' },
  { id: 3, title: 'Social leave' },
  { id: 4, title: 'Sick leave (no documents)' },
  { id: 5, title: 'Sick leave (with documents)' },
  { id: 6, title: 'Study leave' },
  { id: 7, title: 'Paid leave' },
];

function NewRequests() {
  const [isSendingRequest, setRequestSending] = useState(false);
  const [type, setType] = useState(0);
  const [name, setName] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleFromDate = (date) => {
    setFromDate(date);
  };

  const handleToDate = (date) => {
    setToDate(date);
  };

  const handleSendRequest = async () => {
    setRequestSending(true);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    //uploading new data
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <VacationPeriod
          fromDate={fromDate}
          changeFromDate={handleFromDate}
          toDate={toDate}
          changeToDate={handleToDate}
          isSendingRequest={isSendingRequest}
          disablePeriod={true}
        />
        <TextField
          label="Filter by Name"
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          style={{ width: 200, marginRight: 30 }}
        />
        <FormControl style={{ marginRight: 50, width: 350 }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => handleTypeChange(e)}>
            {types.map((type, idx) => (
              <MenuItem key={`type-${type.title}-idx-${idx}`} value={type.id}>
                {type.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <p>New Requests!</p>
    </div>
  );
}

export default NewRequests;
