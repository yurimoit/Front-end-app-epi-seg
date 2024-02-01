import axios from "axios";

//https://crowded-codfish.cyclic.app
export default axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
});
