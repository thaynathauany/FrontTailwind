"use client";

import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const BASE_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) || "";

export const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

Api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

Api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalConfig = (error.config || {}) as RetryConfig;
    const status = error.response?.status;
    const hasToken = typeof window !== "undefined" && localStorage.getItem("access_token");

    if (status === 401 && hasToken && !originalConfig._retry) {
      originalConfig._retry = true;
      const ok = await refreshToken();
      if (ok) return Api.request(originalConfig);
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);

async function refreshToken(): Promise<boolean> {
  try {
    const res = await Api.post("/auth/refresh", {});
    const newToken = (res.data as any)?.access_token;
    if (res.status === 200 && newToken) {
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", newToken);
      }
      return true;
    }
  } catch {}
  return false;
}