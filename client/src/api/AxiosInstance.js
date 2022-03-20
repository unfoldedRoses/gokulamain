//create a axios instance
import axios from "axios";

 export const baseURL = "https://gokulaorganicsmart.herokuapp.com";
// export const baseURL = "http://localhost:5000";

let axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo !== null || userInfo !== undefined) {
      config.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
    }
    // if (token !== null || token !== undefined) {
    //   config.headers["Authorization"] = `Bearer ${token !== null ? JSON.parse(token).token : ""} `;
    // }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;
