import axios from 'axios';

const BASE_URL = 'http://localhost:3001/'; // 'https://localhost:44381/'; - for testing

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

axiosApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export { BASE_URL, axiosApi };
