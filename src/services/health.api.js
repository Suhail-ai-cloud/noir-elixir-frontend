import axios from "axios";

export const wakeBackend = () => {
  return axios.get(
    `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PREFIX}/health/`,
    {
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
