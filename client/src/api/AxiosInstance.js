//create a axios instance
import axios from "axios";

const token = localStorage.getItem("userInfo");

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token !== null ? JSON.parse(token).token : ""} `,
  },
});

export default axiosInstance;
