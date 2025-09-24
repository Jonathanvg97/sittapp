import { ProductGeneralPage } from "@/features/storeGeneral/productGeneralPage";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <ProductGeneralPage />;
    </>
  );
}
