import { apiURLS } from "@/config/api";
import axios from "axios";

export const getProducById = async (id: string) => {
  const response = await axios.get(`${apiURLS.productsDetail}/${id}`);
  return response;
};
