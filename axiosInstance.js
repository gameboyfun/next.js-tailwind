import axios from "axios";
import SwalModal from "./public/constants/sweetAlertConfig";

const axiosInstance = axios.create();
let isRefreshing = false;
let requestsQueue = [];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          isRefreshing = false;
          redirectToLogin();
          return Promise.reject(error);
        }

        return axios
          .get(`/api/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          })
          .then((response) => {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

            // Replays all requests in the queue
            requestsQueue.forEach((req) => {
              req.resolve(axiosInstance(req.config));
            });
            requestsQueue = [];
            return axiosInstance(originalRequest);
          })
          .catch((refreshError) => {
            console.error("Token refresh failed:", refreshError);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            redirectToLogin();
            return Promise.reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        return new Promise((resolve, reject) => {
          requestsQueue.push({
            config: originalRequest,
            resolve,
            reject,
          });
        });
      }
    } else {
      SwalModal({
        title: "เกิดข้อผิดพลาด",
        text: error.response?.data?.message,
        icon: "error",
      })();
    }

    return Promise.reject(error);
  }
);

const redirectToLogin = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  if (window.location.pathname !== "/admin/login") {
    window.location = "/admin/login";
  }
};

export default axiosInstance;
