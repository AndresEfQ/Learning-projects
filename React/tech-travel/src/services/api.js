import axios from 'axios';

const api = axios.create({
  baseURL: 'https://62958cc7810c00c1cb62c565.mockapi.io/Travels',
});

export default api;
