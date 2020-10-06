import React, { Component } from 'react';
import {
  Typography,
  Button,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { Switch, Route, Link, useHistory, withRouter } from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker, DateRangePicker } from 'react-dates';

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

function createData(state, type, date, comment, description) {
  return { state, type, date, comment, description };
}

const rows = [
  createData(
    'In progress',
    'Paid Leave',
    '10/10/2020 - 12/10/2020',
    'Please',
    'Already approved by: Accounting',
  ),
  createData('Approved', 'Sick Leave', '10/10/2020 - 12/10/2020', 'Please', ''),
  createData('Rejected', 'Administrative Leave', '10/10/2020 - 12/10/2020', 'Please', ''),
];

const states = ['Any', 'In progress', 'Approved', 'Rejected'];
const types = [
  'Any',
  'Sick Leave',
  'Administrative Leave',
  'Sick leave (no documents)',
  'Sick leave (with documents)',
];

class MyRequests extends Component {
  state = {
    fromDate: '',
    toDate: '',
    requestState: '0',
    requestType: '0',
    focusedTo: false,
    focusedFrom: false,
    isLoading: false,
  };

  handleStateChange = (event) => {
    this.setState({ requestState: event.target.value });
  };

  handleTypeChange = (event) => {
    this.setState({ requestType: event.target.value });
  };

  render() {
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
            date={this.state.toDate}
            onDateChange={(toDate) => this.setState({ toDate })}
            focused={this.state.focusedTo}
            onFocusChange={({ focused }) => this.setState({ focusedTo: focused })}
          />

          <FormControl style={{ marginRight: 50, width: 150 }}>
            <InputLabel>State</InputLabel>
            <Select value={this.state.requestState} onChange={this.handleStateChange}>
              {states.map((state, idx) => (
                <MenuItem value={idx}>{state}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{ marginRight: 50, width: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select value={this.state.requestType} onChange={this.handleTypeChange}>
              {types.map((type, idx) => (
                <MenuItem value={idx}>{type}</MenuItem>
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

        <TableContainer component={Paper}>
          <Table>
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
              {rows.map((row) => (
                <StyledTableRow key={row.state}>
                  <StyledTableCell component="th" scope="row">
                    {row.state}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.type}</StyledTableCell>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="left">{row.comment}</StyledTableCell>
                  <StyledTableCell align="left">{row.description}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained" color="inherit">
                      View
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const defaultProps = {
  stateDateWrapper: (date) => date,
};

export default MyRequests;
