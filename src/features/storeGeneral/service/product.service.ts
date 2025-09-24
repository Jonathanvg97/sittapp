import axios from "axios";
import { apiURLS } from "@/config/api";

export const getProducts = async () => {
  const res = await axios.get(`${apiURLS.products}/?limit=4&offset=0`);
  console.log(res.data);
  return res;
};
