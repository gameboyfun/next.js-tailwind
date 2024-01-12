import axiosInstance from "@/axiosInstance";
import { LoginModel, LoginResponse } from "@/models/login";
import { profileModel } from "@/models/profile";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

type Store = {
  loading: Boolean;
  loaded: Boolean;
  isLoggedIn: Boolean;
  user: profileModel | null;
  login: (formData: LoginModel) => Promise<AxiosResponse<LoginResponse>>;
  logout: () => Promise<any>;
  getMe: () => Promise<profileModel | void>;
};

export const useStore = create<Store>((set) => ({
  loading: false,
  loaded: true,
  isLoggedIn: false,
  user: null,
  login: (formData: LoginModel) =>
    axiosInstance
      .post("/api/auth/login", formData)
      .then((response) => {
        // const responseData: LoginResponse = response.data;
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        return response;
      }),
  logout: () =>
    axiosInstance.post("/api/auth/logout").then((response) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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
