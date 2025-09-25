import { toast } from "react-toastify";
import { getProducById } from "../service/cardDetail.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useDetailproduct = () => {
  const [loadingDetailProduct, setLoadingDetailProduct] =
    useState<boolean>(false);
  //
  const router = useRouter();
  const getDetailProduct = async (id: string) => {
    setLoadingDetailProduct(true);
    try {
      const response = await getProducById(id);

      if (!response || response.status !== 200) {
        router.push("/");
        return toast.error("Producto no encontrado");
      }

      return response.data;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      toast.error("Error al obtener el producto");
    } finally {
      setLoadingDetailProduct(false);
    }
  };

  return {
    loadingDetailProduct,
    getDetailProduct,
  };
};
