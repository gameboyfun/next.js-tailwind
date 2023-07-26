import axios from "axios";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // Add your token logic here
    const token = localStorage.getItem("token");
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
    // Check for specific error condition or status code
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location = "/login";
      }
    } else {
      Swal.fire({
        title: `เกิดข้อผิดพลาด`,
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: `ตกลง`,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
