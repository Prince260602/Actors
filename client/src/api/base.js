import axios from "axios";

const VITE_SERVER_BASEURL = "https://actors-ycyb.onrender.com/api/v1";
// const VITE_SERVER_BASEURL = "http://localhost:3001/api/v1";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'multipart/form-data',
  },
  baseURL: VITE_SERVER_BASEURL,
  withCredentials: true,
});

export { api };
