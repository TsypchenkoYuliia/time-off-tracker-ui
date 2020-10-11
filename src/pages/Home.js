import React, { Component } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

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

function createData(state, type, date, description) {
  return { state, type, date, description };
}

const rows = [
  createData(
    'In progress',
    'Paid Leave',
    '10/10/2020 - 12/10/2020',
    'Already approved by: Accounting',
  ),
  createData('Approved', 'Sick Leave', '10/10/2020 - 12/10/2020', ''),
  createData('Rejected', 'Administrative Leave', '10/10/2020 - 12/10/2020', ''),
];

class Home extends Component {
  state = {
    isLoading: false,
    dataMyRequests: null,
    dataForApproval: null,
  };

  componentDidMount() {
    //кооонечно же async/await
    // const { isLoading } = this.state.isLoading;
    // this.setState({ isLoading: true });
    // axios.get
  }

  render() {
    if (this.state.isLoading) return <CircularProgress />;

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, margin: 5 }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <h2 style={{ marginBottom: 10 }}>My Recent Requests</h2>
            <Link to="/my_requests">
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '150px', height: '30px', width: '100px', minWidth: '100px' }}>
                View All
              </Button>
            </Link>
            <Button
              className="home__new-request"
              variant="contained"
              style={{ height: '30px', width: '140px', minWidth: '140px' }}
              onClick={() => {
                console.log(this.props.history.push('/new_request'));
              }}>
              New request
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
                  <StyledTableCell align="left">State Details</StyledTableCell>
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
                    <StyledTableCell align="left">{row.description}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ flex: 1, margin: 5 }}>
          <h2 style={{ marginBottom: 10 }}>New Requests For Approval (7)</h2>
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
                  <StyledTableCell align="left">State Details</StyledTableCell>
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
                    <StyledTableCell align="left">{row.description}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);