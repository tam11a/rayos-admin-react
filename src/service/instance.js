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

export const updateInstanceAuthorization = () => {
  instance.interceptors.request.use((req) => {
    req.headers["Authorization"] = localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
    return req;
  });
};
export const getAttachment = (attachmentId) => {
  return baseURL + "/attachments/" + attachmentId;
};

export default instance;
