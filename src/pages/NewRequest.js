import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import moment from 'moment';

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

//ForceMajeureAdministrativeLeave = 1,
// AdministrativeUnpaidLeave = 2,
// SocialLeave = 3,
// SickLeaveWithoutDocuments = 4,
// SickLeaveWithDocuments = 5,
// StudyLeave = 6,
// PaidLeave = 7

let prManagers = [
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
  const [duration, setDuration] = useState(2);
  const [data, setData] = useState(null);

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

    const reviewerIds = data
      .filter((item) => pmanager.includes(item.firstName.concat(' ', item.lastName)))
      .map((item) => {
        return item.id;
      });

    await postNewRequest({
      leaveType,
      fromDate: moment(fromDate._d).format('YYYY-MM-DD').toString(),
      toDate: moment(fromDate._d).format('YYYY-MM-DD').toString(),
      pmanager: [1, ...reviewerIds],
      comment,
      duration,
      userId: context.userId,
    })
      .then(({ data }) => console.log(data))
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });

    setRequestSending(false);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  useEffect(() => {
    async function getAllData() {
      await getAllManagers().then(({ data }) => {
        setData(data);
        prManagers = data.map((item) => {
          return item.firstName.concat(' ', item.lastName);
        });
      });
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

  const renderLeaveBody = [
    {
      id: 1,
      title: 'Administrative force majeure leave',
      comp: <AdministrativeFm {...typeProps} />,
    },
    { id: 2, title: 'Administrative leave', comp: <Administrative {...typeProps} /> },
    { id: 3, title: 'Social leave', comp: <Social {...typeProps} /> },
    { id: 4, title: 'Sick leave (no documents)', comp: <SickNoDoc {...typeProps} /> },
    { id: 5, title: 'Sick leave (with documents)', comp: <SickWithDoc {...typeProps} /> },
    { id: 6, title: 'Study leave', comp: <Study {...typeProps} /> },
    { id: 7, title: 'Paid leave', comp: <Paid {...typeProps} /> },
  ];

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
              {renderLeaveBody.map((type, idx) => (
                <MenuItem key={`${type.title}-${idx}`} value={type.id}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {renderLeaveBody[leaveType - 1].comp}
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

export default React.memo(NewRequest);
