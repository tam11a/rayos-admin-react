import axios from "axios";

export const rootURL = "http://api.rayosbd.com/";
export const baseURL = rootURL + "api";

const instance = axios.create({
  // unauthorized instance
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("tkn")}`,
    "Content-Type": "application/json",
    accept: "*/*",
  },
});

export const updateInstance = () => {
  instance.interceptors.request.use(
    (req) => {
      req.headers["Authorization"] = `Bearer ${localStorage.getItem("tkn")}`;
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

export default instance;
