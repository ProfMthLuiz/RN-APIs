import axios from "axios";

// BaseURL = https://api.exchangeratesapi.io/v1/latest
const api = axios.create({
  baseURL: "http://api.exchangeratesapi.io/v1/",
});

export default api;
