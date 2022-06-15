import Axios from "axios";
const baseURL = "http://localhost:8080/";
export const api = Axios.create({
  baseURL,
});
