import Axios from "axios";
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080/";
export const api = Axios.create({
  baseURL,
});
