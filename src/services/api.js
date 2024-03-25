import axios from "axios";

//https://crowded-codfish.cyclic.app
export default axios.create({
  baseURL: 'https://jose-app-ba25fad444c2.herokuapp.com',
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
});
