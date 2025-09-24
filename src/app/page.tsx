import { ProductGeneralPage } from "@/features/storeGeneral/page/productGeneralPage";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <ProductGeneralPage />;
    </>
  );
}
