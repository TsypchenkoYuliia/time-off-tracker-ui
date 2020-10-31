import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import ReviewsTable from './ReviewsTable';
import ReviewsFilter from './ReviewsFilter';

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

const testData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    role: 'Manager',
    type: 'Administrative leave',
    dates: '10/10/2020-10/11/2020',
    comments: 'pls',
    details: 'Already approved by: Accounting',
  },
  {
    id: 2,
    firstName: 'John2',
    lastName: 'Smith2',
    role: 'Employee',
    type: 'Administrative leave',
    dates: '10/10/2020-10/11/2020',
    comments: 'help',
    details: 'Already approved by: John Smith',
  },
  {
    id: 3,
    firstName: 'John3',
    lastName: 'Smith3',
    role: 'Manager',
    type: 'Study leave',
    dates: '10/10/2020-10/11/2020',
    comments: 'me',
    details: 'Already approved by: Accounting',
  },
  {
    id: 4,
    firstName: 'John4',
    lastName: 'Smith4',
    role: 'Employee',
    type: 'Administrative leave',
    dates: '10/10/2020-10/11/2020',
    comments: 'someone',
    details: 'Already approved by: Accounting',
  },
  {
    id: 5,
    firstName: 'John5',
    lastName: 'Smith5',
    role: 'Manager',
    type: 'Study leave',
    dates: '10/10/2020-10/11/2020',
    comments: 'there',
    details: 'Already approved by: Accounting',
  },
  {
    id: 6,
    firstName: 'John6',
    lastName: 'Smith6',
    role: 'Employee',
    type: 'Administrative leave',
    dates: '10/10/2020-10/11/2020',
    comments: 'are',
    details: 'Already approved by: Accounting',
  },
];

const headCellsNew = [
  { id: 'From', label: 'From' },
  { id: 'Role', label: 'Role' },
  { id: 'Type', label: 'Type' },
  { id: 'Dates', label: 'Dates' },
  { id: 'Comments', label: 'Request Comments' },
  { id: 'Reject', label: 'My Reject Comment' },
];

function EnhancedTableHead({ headCells, actions }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={`table-cell-${headCell.id}`}
            className="reviews__table-cell"
            align="center"
            padding="default">
            {headCell.label}
          </TableCell>
        ))}
        {actions ? (
          <TableCell className="reviews__table-cell" align="center" padding="default">
            Actions
          </TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '10px',
    //margin: '0 auto',
  },
  table: {
    width: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function Rejected() {
  const [data, setData] = useState(null);
  const [isSendingRequest, setRequestSending] = useState(false);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const setRange = () => {
    if (data) {
      let array = [];
      const count = Math.floor(data.length / 5);

      for (let index = 1; index < count + 1; index++) {
        array.push(5 * index);
      }
      array.push(data.length);
      return array;
    }
  };

  const emptyRows = data && rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleSendRequest = async () => {
    setRequestSending(true);
  };

  useEffect(() => {
    //uploading new data
    setData(testData);
    setLoading(false);
  }, []);

  return (
    <div>
      <ReviewsFilter types={types} isSendingRequest={isSendingRequest} />
      {/* <ReviewsTable data={testData} headCells={headCellsNew} /> */}
      <div className={classes.root}>
        {isLoading ? (
          <CircularProgress />
        ) : data.length > 0 ? (
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'medium'}
              aria-label="enhanced table">
              <EnhancedTableHead headCells={headCellsNew} />
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    const labelId = `enhanced-table-${index}`;

                    return (
                      <TableRow
                        className="reviews__users-table-row"
                        hover
                        tabIndex={-1}
                        key={item.id}>
                        <TableCell
                          component="th"
                          align="center"
                          id={labelId}
                          scope="row"
                          padding="none">
                          {item.firstName.concat(' ', item.lastName)}
                        </TableCell>
                        <TableCell align="center">{item.role}</TableCell>
                        <TableCell align="center">{item.type}</TableCell>
                        <TableCell align="center">{item.dates}</TableCell>
                        <TableCell align="center">{item.comments}</TableCell>
                        <TableCell align="center">{item.details}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 33 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={setRange()}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <h3>No data</h3>
        )}
      </div>
    </div>
  );
}

export default Rejected;
