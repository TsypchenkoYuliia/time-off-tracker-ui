import React, { useState, useEffect } from 'react';
import {
  Button,
  withStyles,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

import { getMyRequests } from '../components/Axios';
import { convertDate } from '../config';
import { types, states } from '../constants';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    '&:not(:last-child)': {
      borderRightWidth: '1px',
      borderRightColor: 'lightgray',
      borderRightStyle: 'solid',
    },
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.white,
    },
  },
}))(TableRow);

function MyRequests() {
  const [data, setData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [requestState, setRequestState] = useState('0');
  const [requestType, setRequestType] = useState('0');
  const [focusedTo, setFocusTo] = useState(false);
  const [focusedFrom, setFocusFrom] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleStateChange = (event) => {
    setRequestState(event.target.value);
  };

  const handleTypeChange = (event) => {
    setRequestType(event.target.value);
  };

  useEffect(() => {
    async function getRequests() {
      await getMyRequests().then(({ data }) => {
        setData(data);
        setLoading(false);
      });
    }

    getRequests();
  }, []);

  return (
    <div>
      <h2>Statistics {new Date().getFullYear()}</h2>
      <div className="statistics">
        <div className="statistics__text">
          <p>Paid leave: 11 days used</p>
          <p>Administrative leave: 11 days used</p>
        </div>

        <div className="statistics__text">
          <p>Sick leave (no document): 11 days used</p>
          <p>Sick leave (with documents): 0 days used</p>
        </div>

        <Button variant="contained" color="secondary" style={{ height: '40px' }}>
          New Request
        </Button>
      </div>

      <h2>My Requests </h2>

      <div
        className="filters"
        style={{
          flexDirection: 'row',
          marginBottom: 15,
          flexWrap: 'nowrap',
        }}>
        <SingleDatePicker
          showClearDate
          placeholder="toDate"
          numberOfMonths={1}
          date={toDate}
          onDateChange={(toDate) => setToDate(toDate)}
          focused={focusedTo}
          onFocusChange={({ focused }) => setFocusTo(focused)}
        />

        <FormControl style={{ marginRight: 50, width: 150 }}>
          <InputLabel>State</InputLabel>
          <Select value={requestState} onChange={handleStateChange}>
            {states.map((state, idx) => (
              <MenuItem key={`state-${state}-idx-${idx}`} value={idx}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginRight: 50, width: 230 }}>
          <InputLabel>Type</InputLabel>
          <Select value={requestType} onChange={handleTypeChange}>
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
          disabled={data && data.length === 0}
          style={{ verticalAlign: 'bottom', height: '40px' }}>
          Filter
        </Button>
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : data.length > 0 ? (
        <TableContainer>
          <TableContainer>
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ minWidth: '110px', width: '120px' }} align="left">
                  State
                </StyledTableCell>
                <StyledTableCell style={{ width: '180px' }} align="left">
                  Type
                </StyledTableCell>
                <StyledTableCell style={{ width: '200px' }} align="left">
                  Dates
                </StyledTableCell>
                <StyledTableCell align="left">My Comment</StyledTableCell>
                <StyledTableCell align="left">State Details</StyledTableCell>
                <StyledTableCell style={{ width: '100px' }} align="left">
                  View
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                const startDate = convertDate(item.startDate);
                const endDate = convertDate(item.endDate);
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {states[item.stateId]}
                    </StyledTableCell>
                    <StyledTableCell align="left">{types[item.typeId].title}</StyledTableCell>
                    <StyledTableCell align="center">
                      {startDate} - {endDate}
                    </StyledTableCell>
                    <StyledTableCell align="left">{item.comment}</StyledTableCell>
                    <StyledTableCell align="left">{item.id}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" color="inherit">
                        View
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </TableContainer>
      ) : (
        <h3>No requests</h3>
      )}
    </div>
  );
}

export default MyRequests;
