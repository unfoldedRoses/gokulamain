//create a axios instance
import axios from "axios";

export const baseURL =
  "http://localhost:5000";
const token = localStorage.getItem("userInfo");

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token !== null ? JSON.parse(token).token : ""} `,
  },
});

export default axiosInstance;
