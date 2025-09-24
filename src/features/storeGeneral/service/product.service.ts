import axios from "axios";
import { apiURLS } from "@/config/api";

export const getProducts = async ({
  limit = 4,
  skip = 0,
  category,
  search,
}: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}) => {
  let url = apiURLS.products;

  if (category) {
    url = `${url}/category/${category}`;
  } else if (search && search.trim() !== "") {
    url = `${url}/search`;
  }

  const queryParams = new URLSearchParams();
  if (limit) queryParams.append("limit", limit.toString());
  if (skip) queryParams.append("skip", skip.toString());
  if (search && search.trim() !== "" && !category) {
    queryParams.append("q", search.trim());
  }

  if (queryParams.toString()) {
    url = `${url}?${queryParams.toString()}`;
  }

  const res = await axios.get(url);

  let products = res.data.products;
  if (category && search && search.trim() !== "") {
    const lower = search.trim().toLowerCase();
    products = products.filter((p: any) =>
      p.title.toLowerCase().includes(lower)
    );
  }

  return {
    ...res,
    data: {
      ...res.data,
      products,
      total: res.data.total,
      limit,
    },
  };
};

export const getCategories = async () => {
  const res = await axios.get(`${apiURLS.categories}`);
  return res;
};
