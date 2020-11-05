import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import ReviewsTable from './ReviewsTable';
import ReviewsFilter from './ReviewsFilter';
import { loadData } from './LoadReviewsData';
import { getMyReviewsByFilter } from '../Axios';
import { types } from '../../constants';

function NewRequests() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [isSendingRequest, setRequestSending] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleSendRequest = async () => {
    setRequestSending(true);
  };

  const handleFilter = (fromDate, toDate, name, typeId) => {
    setLoading(true);
    getMyReviewsByFilter(fromDate, toDate, name, typeId).then(({ data }) => {
      const isNew = data.filter((item) => item.isApproved === null);
      setData(isNew);
      setLoading(false);
    });
  };

  const getAllUsers = (data) => {
    setUsers(data);
  };

  const getData = (data) => {
    setData(data);
  };

  const uploaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    loadData(getAllUsers, getData, uploaded, null);
  }, []);

  return (
    <div>
      <ReviewsFilter
        types={types}
        isSendingRequest={isSendingRequest}
        handleFilter={handleFilter}
      />

      <div>
        {isLoading ? (
          <CircularProgress />
        ) : data.length > 0 ? (
          <ReviewsTable data={data} users={users} />
        ) : (
          <h3>No data</h3>
        )}
      </div>
    </div>
  );
}

export default NewRequests;
