import axios from "axios";

const baseURL = "http://localhost:8000";

const privateAxios = axios.create({
  baseURL,
});

privateAxios.interceptors.request.use((config: any) => {
  const jwtTokent = localStorage.getItem("token");

  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtTokent}`,
    },
  };
});

export default privateAxios;
