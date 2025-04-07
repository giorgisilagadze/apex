import axios from "axios";

export const axiosAdmin = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

axiosAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminTokenApex");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
