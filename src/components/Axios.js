import axios from 'axios';

import { BASE_URL } from '../config';

export const NewUser = (newUser) => {
  return axios.post(BASE_URL + 'users', newUser);
};

export const DeleteUser = (id) => {
  return axios.delete(BASE_URL + 'users/' + id);
};

export const ChangeUserRole = (id, role) => {
  return axios.patch(BASE_URL + 'users/' + id, { role });
};
