import axios, { HttpStatusCode } from "axios";
import { EKeyHeader } from "../types/enums/basicHeader";

const APIService = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
APIService.interceptors.request.use(
  async (request) => {
    // Do something before request is sent
    const idToken = localStorage.getItem(EKeyHeader.ACCESS_TOKEN);

    if (idToken) {
      if (idToken) request.headers[EKeyHeader.ACCESS_TOKEN] = idToken;
    } else {
      delete request.headers[EKeyHeader.ACCESS_TOKEN];
    }

    return request;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
APIService.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { statusCode } = error?.response?.data || {};
    if (statusCode === HttpStatusCode.Unauthorized) {
      handleLogout();
      return;
    }
    return Promise.reject(error);
  }
);

export const clearAxiosToken = () => {
  delete APIService.defaults.headers["Authorization"];
};

export const handleLogout = () => {
  localStorage.removeItem(EKeyHeader.ACCESS_TOKEN);
  localStorage.removeItem(EKeyHeader.REFRESH_TOKEN);
  localStorage.removeItem(EKeyHeader.USER_ID);
  clearAxiosToken();
};

export default APIService;
