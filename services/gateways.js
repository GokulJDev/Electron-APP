import { kaira } from "./url";
import axios from "axios";

export const publicGateway = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

publicGateway.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const privateGateway = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

privateGateway.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

privateGateway.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      try {
        const response = await publicGateway.post(kaira.refresh, {
          refreshToken: localStorage.getItem("refresh_token"),
        });
        localStorage.setItem("access_token", response.data.accessToken);
        const { config } = error;
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "access_token"
        )}`;
        return await new Promise((resolve, reject) => {
          privateGateway
            .request(config)
            .then((response_1) => {
              resolve(response_1);
            })
            .catch((error_1) => {
              reject(error_1);
            });
        });
      } catch (error_2) {
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/login";
        }, 2000);
        return Promise.reject(error_2);
      }
    } else {
      return Promise.reject(error);
    }
  }
);
