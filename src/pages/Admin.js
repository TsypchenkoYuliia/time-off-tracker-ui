import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import { Context } from '../Context';
import UsersTable from '../components/Admin/UsersTable';

const uri = 'http://localhost:3001/users';

function Admin() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [role, setRole] = useState(-1);
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

  //Roles upload from db
  // useEffect(() => {
  //  axios.get(uri+'/role').then(({data}) => setRoles(data))
  // }, [])

  const handleFilterName = () => {
    const filteredData = filter
      ? data.filter(
          (item) =>
            item.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            item.lastName.toLowerCase().includes(filter.toLowerCase()),
        )
      : data;

    return role === -1 ? filteredData : filteredData.filter((item) => item.role === roles[role]);
  };

  const roles = ['Employee', 'Manager'];

  return (
    <div>
      <div style={{ flexDirection: 'row', padding: '10px', marginTop: '10px' }}>
        <TextField
          label="Filter by Name"
          variant="standard"
          className="admin__form-input"
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginBottom: 20, width: 300 }}
        />
        <FormControl className="admin__filter-role">
          <InputLabel>Filter by Role</InputLabel>
          <Select
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
            }}>
            <MenuItem value={-1}>Any</MenuItem>
            {roles.map((obj, idx) => (
              <MenuItem key={`key-${idx}-name${obj}`} value={idx}>
                {obj}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div style={{ padding: '0 20px' }}>
        {data ? (
          <UsersTable
            data={handleFilterName()}
            roles={roles}
            onDelete={(arr) => {
              handleDelete(arr);
            }}
          />
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}

export default React.memo(Admin);
