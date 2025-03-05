import { dummyProductCardData, dummyProductDetailData } from "@/dummyData";
import ProductDetailPage from "@/src/page/product-detail/ProductDetailPage";

export default function page() {
  const productData = dummyProductDetailData;
  const dummyProductsData = dummyProductCardData;

  return (
    <div className="flex flex-col gap-10">
      <ProductDetailPage
        productData={productData}
        productsCardData={dummyProductsData}
      />
    </div>
  );
}
