import axios from "axios";

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PREFIX}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (email, password) => {
  return authApi.post("/token/", {
    email,
    password,
  });
};
