import axios from "axios";

//https://crowded-codfish.cyclic.app
export default axios.create({
  baseURL: 'https://famous-newt-yoke.cyclic.app',
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
});
