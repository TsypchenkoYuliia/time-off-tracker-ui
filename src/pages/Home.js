import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withStyles, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getMyRequests } from '../components/Axios';
import { Context } from '../Context';
import NewRequest from './NewRequest';

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

const states = ['Any', 'New', 'In progress', 'Approved', 'Rejected'];
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

function Home() {
  const [isLoading, setLoading] = useState(true);
  const [isNewRequestOpen, setNewRequestState] = useState(false);
  const [requests, setRequests] = useState(null);
  const [reviews, setReviews] = useState(null);

  let history = useHistory();
  const [context, setContext] = useContext(Context);

  // componentDidMount() {
  //   //кооонечно же async/await
  //   // const { isLoading } = this.state.isLoading;
  //   // this.setState({ isLoading: true });
  //   // axios.get
  // }

  useEffect(() => {
    async function getRequests() {
      await getMyRequests().then(({ data }) => {
        const subData = data.slice(0, 3);
        setRequests(subData);
        setReviews(subData);
      });
      setLoading(false);
    }
    getRequests();

    // async function getReviews() {
    //   await getMyReviews().then(({ data }) => {
    //     const subData = data.slice(0, 3);
    //     setReviews(subData);
    //   });
    //   setLoading(false);
    // }
    // getReviews();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1, margin: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h2 style={{ marginBottom: 10 }}>My Recent Requests</h2>

          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/my_requests')}
            style={{ marginRight: '150px', height: '30px', width: '100px', minWidth: '100px' }}>
            View All
          </Button>
          <Button
            className="home__new-request"
            variant="contained"
            style={{ height: '30px', width: '140px', minWidth: '140px' }}
            onClick={() => {
              setNewRequestState(true);
            }}>
            New request
          </Button>
        </div>

        {isLoading ? (
          <CircularProgress />
        ) : requests.length > 0 ? (
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
                  <StyledTableCell align="left">State Details</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => {
                  const startDate = request.startDate;
                  const endDate = request.endDate;
                  return (
                    <StyledTableRow key={request.id}>
                      <StyledTableCell component="th" scope="row">
                        {states[request.stateId]}
                      </StyledTableCell>
                      <StyledTableCell align="left">{types[request.typeId].title}</StyledTableCell>
                      <StyledTableCell align="center">
                        {startDate} - {endDate}
                      </StyledTableCell>
                      <StyledTableCell align="left">{request.id}</StyledTableCell>
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

      {context.role !== 'Employee' ? (
        isLoading ? (
          <CircularProgress />
        ) : (
          <div style={{ flex: 1, margin: 5 }}>
            <h2 style={{ marginBottom: 10 }}>
              New Requests For Approval ({reviews && reviews.length})
            </h2>
            {reviews.length > 0 ? (
              <TableContainer>
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
            ) : (
              <h3>No reviews</h3>
            )}
          </div>
        )
      ) : null}
      <NewRequest
        isOpen={isNewRequestOpen}
        onClose={() => {
          setNewRequestState(false);
        }}
      />
    </div>
  );
}

export default Home;
