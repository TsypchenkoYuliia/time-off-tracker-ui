import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import axios from 'axios';
import { Context } from '../Context';
import { postNewRequest, getAllManagers } from '../components/Axios';

import {
  Administrative,
  AdministrativeFm,
  Paid,
  SickNoDoc,
  SickWithDoc,
  Social,
  Study,
} from '../components/Leaves/index';

const leaves = [
  'Administrative force majeure leave',
  'Administrative leave',
  'Social leave',
  'Sick leave (no documents)',
  'Sick leave (with documents)',
  'Study leave',
  'Paid leave',
];

const prManagers = [
  'Anney Kirillova',
  'Bill Ivanov',
  'Reygar Smith',
  'Kirill Retushev',
  'Yevheniy Enderov',
  'Bill Ivanova',
  'John Reygar',
  'John Killian',
  'John Lothbrok',
  'John Kirev',
  'John Kirov',
];

function NewRequest({ isOpen, onClose }) {
  const [context, setContext] = useContext(Context);
  const [leaveType, setLeaveType] = useState(6);
  const [isSendingRequest, setRequestSending] = useState(false);
  const [comment, setComment] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [pmanager, setPManager] = useState(['']);
  const [duration, setDuration] = useState('Full day');

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleFromDate = (date) => {
    setFromDate(date);
  };

  const handleToDate = (date) => {
    setToDate(date);
  };

  const handleManagers = (array) => {
    setPManager(array);
  };

  const handleSendRequest = async () => {
    setRequestSending(true);

    //real request
    // await postNewRequest({
    //   Type: leaveType,
    //   StartDate: fromDate,
    //   EndDate: toDate,
    //   Reviews: pmanager,
    //   HasAccountingReviewPassed: false, //лишнее
    //   Comment: comment,
    //   State: 'New',
    //   Duration: duration,
    //   UserId: context.userId,
    // })
    //   .then(({ data }) => console.log(data))
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response.data);
    //   });

    await axios
      .post('https://url')
      .then((data) => {})
      .catch((err) => {});
    setRequestSending(false);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  useEffect(() => {
    async function getAllData() {
      //await axios.get(url).then({data}=>) //axios request for all managers - getAllManagers
      //axios request for all roles
      //axios request for all parts
      //axios request for all pm
    }
    getAllData();
  }, []);

  const typeProps = {
    prManagers: prManagers,
    isSendingRequest: isSendingRequest,
    comment: comment,
    changeComment: handleComment,
    fromDate: fromDate,
    changeFromDate: handleFromDate,
    toDate: toDate,
    changeToDate: handleToDate,
    managers: pmanager,
    changeManagers: handleManagers,
    duration: duration,
    changeDuration: handleDuration,
  };

  const renderLeaveBody = (type) => {
    switch (type) {
      case 0:
        return <AdministrativeFm {...typeProps} />;
      case 1:
        return <Administrative {...typeProps} />;
      case 2:
        return <Social {...typeProps} />;
      case 3:
        return <SickNoDoc {...typeProps} />;
      case 4:
        return <SickWithDoc {...typeProps} />;
      case 5:
        return <Study {...typeProps} />;
      case 6:
        return <Paid {...typeProps} />;
    }
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        onClose={onClose}
        aria-labelledby="new-request-title"
        aria-describedby="new-request-description">
        <DialogTitle id="new-request-title">New Request</DialogTitle>
        <DialogContent className="leave">
          <FormControl
            disabled={isSendingRequest}
            style={{ marginRight: 20, marginBottom: 20, width: '100%' }}>
            <InputLabel>Leave Type</InputLabel>
            <Select
              value={leaveType}
              onChange={(e) => {
                setLeaveType(e.target.value);
              }}>
              {leaves.map((type, idx) => (
                <MenuItem key={`${type}-${idx}`} value={idx}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {renderLeaveBody(leaveType)}
        </DialogContent>
        <DialogActions>
          <Button
            className="new-request__ok-btn"
            variant="contained"
            disabled={isSendingRequest}
            onClick={handleSendRequest}>
            Send Request
          </Button>
          <Button
            className="new-request__cancel-btn"
            variant="contained"
            disabled={isSendingRequest}
            onClick={onClose}
            autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewRequest;
