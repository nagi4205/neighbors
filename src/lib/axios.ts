import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});
