import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

type LoginPayload = { email: string; password: string };
type RegisterPayload = { name: string; email: string; password: string };

export const loginUser = async (payload: LoginPayload) => {
  const res = await axios.post(`${API_BASE}/api/auth/login`, payload);
  const data = res.data.data;

  // Persist token and user to localStorage
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }
  localStorage.setItem(
    "user",
    JSON.stringify({ id: data._id, name: data.name, email: data.email })
  );

  return data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const res = await axios.post(`${API_BASE}/api/auth/register`, payload);
  // Intentionally do not auto-login here; return the created user data
  return res.data;
};

export const logoutUser = async () => {
  // Client-side only: clear local storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return { success: true };
};

export const getStoredToken = () => localStorage.getItem("token");
export const getStoredUser = () => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export default {
  loginUser,
  registerUser,
  logoutUser,
  getStoredToken,
  getStoredUser,
};
