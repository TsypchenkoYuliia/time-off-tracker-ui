import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getMyRequests, getMyReviews, getUsers } from '../components/Axios';
import { Context } from '../Context';
import NewRequest from './NewRequest';
import ReviewsTable from '../components/OtherRequests/ReviewsTable';
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

function Home() {
  const [isLoading, setLoading] = useState(true);
  const [isNewRequestOpen, setNewRequestState] = useState(false);
  const [requests, setRequests] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [users, setUsers] = useState(null);

  let history = useHistory();
  const [context, setContext] = useContext(Context);

  useEffect(() => {
    setLoading(true);
    getUsers('', '').then(({ data }) => {
      setUsers(data);
    });

    getMyRequests().then(({ data }) => {
      const subData = data.slice(0, 3);
      setRequests(subData);
      if (context.role === 'Employee') {
        setLoading(false);
      }
    });

    if (context.role !== 'Employee') {
      getMyReviews().then(({ data }) => {
        const subData = data.filter((item) => item.isApproved === null);
        setReviews(subData);
      });
      setLoading(false);
    }
    // async function getRequests() {
    //   await getMyRequests().then(({ data }) => {
    //     const subData = data.slice(0, 3);
    //     setRequests(subData);
    //     if (context.role === 'Employee') {
    //       setLoading(false);
    //     }
    //   });
    // }
    // getRequests();

    // if (context.role !== 'Employee') {
    //   async function getReviews() {
    //     await getMyReviews().then(({ data }) => {
    //       const subData = data.filter((item) => item.isApproved === null);
    //       setReviews(subData);
    //     });
    //     setLoading(false);
    //   }
    //   getReviews();
    // }
  }, []);

  const joinData = (req) => {
    const joinedData = req.map((item) => {
      item.reviews.map(
        (item) => (item.reviewer = users.find((user) => user.id === item.reviewerId)),
      );
      item.user = users.find((user) => user.id === item.userId);
      return item;
    });
    return joinedData;
  };

  const isApprovedBy = (req) => {
    const { reviews } = req;
    const approved = reviews.reduce((sum, item) => {
      if (item.isApproved) {
        return `${sum} ${item.reviewer.firstName.concat(' ', item.reviewer.lastName)},`;
      }
      return sum;
    }, '');
    return approved ? `Already approved by: ${approved.slice(0, -1)}` : '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 0.7, margin: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h2 style={{ marginBottom: 10, marginRight: 10 }}>My Recent Requests</h2>

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

        {requests === null && isLoading ? (
          <CircularProgress />
        ) : users && requests && requests.length > 0 ? (
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
                {joinData(requests).map((request) => {
                  const startDate = convertDate(request.startDate);
                  const endDate = convertDate(request.endDate);
                  return (
                    <StyledTableRow key={request.id}>
                      <StyledTableCell component="th" scope="row">
                        {states[request.stateId]}
                      </StyledTableCell>
                      <StyledTableCell align="left">{types[request.typeId].title}</StyledTableCell>
                      <StyledTableCell align="center">
                        {startDate} - {endDate}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {request.stateId === 4
                          ? request.reviews.find((rev) => rev.isApproved === false).comment
                          : isApprovedBy(request)}
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

      {context.role !== 'Employee' ? (
        isLoading ? (
          <CircularProgress />
        ) : (
          <div style={{ flex: 1, margin: 5 }}>
            <h2 style={{ marginBottom: 10 }}>
              New Requests For Approval ({reviews && reviews.length})
            </h2>
            {users && reviews && reviews.length > 0 ? (
              <ReviewsTable data={reviews} users={users} short />
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

export default React.memo(Home);
