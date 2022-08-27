import axios from "axios";

export const mainAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT + "/api",
});
