import { apiURLS } from "@/config/api";
import axios from "axios";

export const getProducById = async (id: string) => {
  console.log("API_URL (server):", process.env.API_URL);
  console.log("apiURLS.productsDetail:", apiURLS.productsDetail);
  const response = await axios.get(`${apiURLS.productsDetail}/${id}`);
  return response;
};
