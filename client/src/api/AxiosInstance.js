//create a axios instance
import axios from "axios";

export const baseURL = "https://gokulaorganicsmart.herokuapp.com";
const token = localStorage.getItem("userInfo");

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token !== null ? JSON.parse(token).token : ""} `,
  },
});

export default axiosInstance;
