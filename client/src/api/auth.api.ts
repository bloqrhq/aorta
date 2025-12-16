import api from "./axios";

export const loginUser = (data: {
  email: string;
  password: string;
}) => api.post("/api/auth/login", data);

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/api/auth/register", data);

export const logoutUser = () =>
  api.post("/api/auth/logout");

export const getMe = () =>
  api.get("/api/auth/me");
