import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@material-ui/core';

import VacationPeriod from '../Leaves/VacationPeriod';

function ReviewsFilter({ types, isSendingRequest }) {
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

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
      <VacationPeriod
        fromDate={fromDate}
        changeFromDate={handleFromDate}
        toDate={toDate}
        changeToDate={handleToDate}
        isSendingRequest={isSendingRequest}
        disablePeriod={true}
      />
      <TextField
        value={name}
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

      <Button
        variant="contained"
        color="secondary"
        style={{ verticalAlign: 'bottom', height: '40px' }}>
        Filter
      </Button>
    </div>
  );
}

export default ReviewsFilter;
