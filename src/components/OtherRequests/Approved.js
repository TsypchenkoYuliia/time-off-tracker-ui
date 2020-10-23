import React, { useState, useEffect } from 'react';

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
  { id: 'State', label: 'State' },
  { id: 'Comments', label: 'Request Comments' },
  { id: 'Details', label: 'State Details' },
];

function Approved() {
  const [isSendingRequest, setRequestSending] = useState(false);

  const handleSendRequest = async () => {
    setRequestSending(true);
  };

  useEffect(() => {
    //uploading new data
  }, []);

  return (
    <div>
      <ReviewsFilter types={types} isSendingRequest={isSendingRequest} />
      <ReviewsTable data={testData} headCells={headCellsNew} />
    </div>
  );
}

export default Approved;
