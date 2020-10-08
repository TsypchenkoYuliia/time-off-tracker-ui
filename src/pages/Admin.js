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
import axios from 'axios';

import { Context } from '../Context';
import UsersTable from '../components/Admin/UsersTable';

const uri = 'http://localhost:3001/users';

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
    '&:last-child': {
      borderRightWidth: '1px',
      borderRightColor: 'lightgray',
      borderRightStyle: 'solid',
    },
    '&:first-child': {
      borderLeftWidth: '1px',
      borderLeftColor: 'lightgray',
      borderLeftStyle: 'solid',
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

function Admin() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [context, setContext] = useContext(Context);
  let history = useHistory();

  useEffect(() => {
    if (context !== 'admin') {
      history.replace('/');
      return;
    }

    setLoading(true);

    axios
      .get(uri)
      .then(({ data }) => {
        const filteredData = data.filter((item) => item.role !== 'admin');
        setData(filteredData);

        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (array) => {
    array.forEach((id) => axios.delete('http://localhost:3001/users/' + id));
  };

  return (
    <div>
      <div style={{ flexDirection: 'row' }}>
        <p>There will be name filter</p>
        <p>There will be Role filter</p>
        <p>About button I don't know</p>
      </div>

      <div style={{ padding: '0 20px' }}>
        {data ? (
          <>
            {/* <TableContainer>
              <Table style={{ width: '900px', marginBottom: '10px' }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ minWidth: '110px', width: '120px' }} align="center">
                      Name
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '180px' }} align="center">
                      Login
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '200px' }} align="center">
                      Email
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '200px' }} align="center">
                      Role
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '200px' }} align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => {
                    return (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell component="th" scope="row">
                          {item.firstName + ' ' + item.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="center">{item.login}</StyledTableCell>
                        <StyledTableCell align="center">{item.email}</StyledTableCell>
                        <StyledTableCell align="center">{item.role}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Button variant="contained">Edit</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer> */}

            <UsersTable
              data={data}
              onDelete={(arr) => {
                handleDelete(arr);
              }}
            />
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}

export default Admin;
