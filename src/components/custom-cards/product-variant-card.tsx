import { ProductVariantType } from "@/src/types/productTypes";
import { Dispatch, SetStateAction } from "react";
// import ProductVariantCard from "@/src/components/custom-cards/product-variant-card";
// import ProductVariantCard from "@/src/page/product-detail/product-detail-header";

type Props = {
  variant: ProductVariantType;
  selected: boolean;
  setSelectedVariant: Dispatch<SetStateAction<ProductVariantType>>;
};

export default function ProductVariantCard({
  variant,
  setSelectedVariant,
  selected,
}: Props) {
  const selectVariantHandler = () => {
    setSelectedVariant(variant);
  };

  // Check if the variant is "Available" or "Out of Stock"
  const isInStock = variant.stock === "Available";

  return (
    <div
      onClick={selectVariantHandler}
      className={`border hover:outline transition-[outline] ease-soft-spring duration-50  ${
        selected
          ? "outline outline-secondary-500"
          : "hover:outline-secondary-500"
      } border-secondary-500 cursor-pointer overflow-hidden rounded-xl`}
    >
      <div className="bg-primary-500 bg-opacity-20 py-3 px-2 border-b border-secondary-500 text-xl max-sm:text-lg font-medium text-secondary-500">
        {variant.units}
      </div>
      <div className="flex flex-col p-2">
        <p className="text-xl font-medium">₹{variant.sellingPrice}</p>
        <p className="text-shade text-xs">
          (₹ {variant.units} per unit)
        </p>
        <p
          className={`${
            isInStock ? "text-green-500" : "text-red-500"
          } text-xs`}
        >
          {isInStock ? "Available" : "Out of Stock"}
        </p>
      </div>
    </div>
  );
}
