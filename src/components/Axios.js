import axios from 'axios';

import { BASE_URL } from '../config';

export const newUser = (newUser) => {
  return axios.post(BASE_URL + 'users', newUser); //endpoint in api - accounts
};

export const getUserById = (id) => {
  return axios.get(BASE_URL + 'users/' + id);
};

export const deleteUser = (id) => {
  return axios.delete(BASE_URL + 'users/' + id);
};

export const changeUserRole = (id, changedUser) => {
  return axios.put(BASE_URL + 'users/' + id, changedUser);
};

export const getAllManagers = () => {
  return axios.get(BASE_URL + 'users?role=Manager');
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
  return axios.post(BASE_URL + 'requests', {
    TypeId: leaveType,
    StartDate: fromDate,
    EndDate: toDate,
    ReviewersIds: pmanager,
    Comment: comment,
    //State: 'New', оставлю для себя, уберу при добавлении интерсепции и после теста реального бэка
    DurationId: duration,
    UserId: userId,
  });
};
