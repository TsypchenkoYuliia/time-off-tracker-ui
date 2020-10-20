import axios from 'axios';
import { Context } from './Context';

const BASE_URL = 'http://localhost:3001/';

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Context.token}`;
  return config;
});

export { BASE_URL, axiosApi };
