import axios from "axios";

const instance = axios.create({
  baseURL: "https://filling-exel-table.onrender.com/api",
});

export default instance;
