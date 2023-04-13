import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `http://localhost:3001/`,
    withCredentials: "true",
    responseType: "json",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
});

export default axiosClient;