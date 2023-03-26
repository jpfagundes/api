import axios from "axios";

export const api = axios.create({
  baseURL: 'https://food-explorer-api-a5gj.onrender.com'
});
