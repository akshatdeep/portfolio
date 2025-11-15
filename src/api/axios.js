import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change this to your backend URL
  withCredentials: true, // only if you use cookies or authentication
});

// Optional: Attach JWT token automatically (if using JWT)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
