import axios from "axios";

const api = axios.create({
  baseURL: "https://api-server-users.onrender.com",
});

export default api;
