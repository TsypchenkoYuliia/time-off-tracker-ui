import axios from 'axios';

import { BASE_URL } from '../config';

export const newUser = (newUser) => {
  return axios.post(BASE_URL + 'users', newUser); //endpoint in api - accounts
};

export const deleteUser = (id) => {
  return axios.delete(BASE_URL + 'users/' + id);
};

export const changeUserRole = (id, role) => {
  return axios.patch(BASE_URL + 'users/' + id, { role });
};

export const getAllManagers = () => {
  return axios.get(BASE_URL + 'managers'); //endpoint will be later
};

export const postNewRequest = ({
  userId,
  leaveType,
  comment,
  fromDate,
  toDate,
  pmanager,
  duration,
}) => {
  return axios.post(BASE_URL + 'new_request', {
    Type: leaveType,
    StartDate: fromDate,
    EndDate: toDate,
    Reviews: pmanager,
    HasAccountingReviewPassed: false, //лишнее
    Comment: comment,
    State: 'New',
    Duration: duration,
    UserId: userId,
  });
};
