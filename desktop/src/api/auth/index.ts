import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BUSINESS_API_BASE_URL,
});

export default instance;
