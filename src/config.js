import axios from 'axios';
import moment from 'moment';
import * as tunnel from 'tunnel';

const BASE_URL = 'http://trackerhost2020-001-site1.ftempurl.com/';

const agent = tunnel.httpsOverHttp({
    proxy: {
        host: '5.39.200.88',
        port: 54987,
    },
});

const axiosApi = axios.create({
    baseURL: BASE_URL,
    httpsAgent: agent,
    proxy:false
});

axiosApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

const convertDate = (date) => {
  return moment(date).format('MM/DD/YYYY').toString();
};

export { BASE_URL, axiosApi, convertDate };
