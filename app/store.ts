import axiosInstance from "@/axiosInstance";
import { Login } from "@/models/login";
import { error } from "console";
import { create } from "zustand";

type Store = {
  getMe: any;
  loading: Boolean;
  loaded: Boolean;
  isLoggedIn: Boolean;
  user: any;
  login: (formData: Login) => any;
  logout: () => any;
};

export const useStore = create<Store>((set) => ({
  loading: false,
  loaded: true,
  isLoggedIn: false,
  user: null,
  login: (formData: Login) =>
    axiosInstance.post("/api/auth/login", formData).then((response) => {
      localStorage.setItem("token", response.data.token);
      return response;
    }),
  logout: () =>
    axiosInstance.post("/api/auth/logout").then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      set((state) => ({
        user: null,
      }));
      return response;
    }),
  getMe: () =>
    axiosInstance.get("/api/auth/me").then((response) => {
      set((state) => ({
        user: response.data,
      }));
    }),
}));
