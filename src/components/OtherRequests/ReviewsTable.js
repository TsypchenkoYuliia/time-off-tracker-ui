import React from 'react';
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

export default function ReviewsTable({ data, headCells, actions }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  return (
    <div className={classes.root}>
      {data ? (
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table">
            <EnhancedTableHead headCells={headCells} actions={actions} />
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
                      {actions ? (
                        <TableCell align="center">
                          <Button
                            className="users-table__ok-btn"
                            variant="contained"
                            style={{ marginRight: 10 }}
                            onClick={() => {}}>
                            Accept
                          </Button>
                          <Button
                            className="users-table__cancel-btn"
                            variant="contained"
                            onClick={() => {}}>
                            Reject
                          </Button>
                        </TableCell>
                      ) : null}
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
        <p>No data</p>
      )}
    </div>
  );
}
