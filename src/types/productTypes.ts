export type ProductCardType = {
  imgUrl: string;
  title: string;
  sellingPrice: number;
  actualPrice: number;
  offer?: number;
  id: number;
  isLiked: boolean;
};
export type PackageCardType = {
  id: number;
  imgUrl: string;
  title: string;
};

export type CheckupCardType = {
  imgUrl: string;
  title: string;
  description: string;
  sellingPrice: number;
  actualPrice: number;
  offer?: number;
  id: number;
};

export type ReviewType = {
  user: string;
  rating: number;
  title: string;
  comment: string;
  is_recommended: boolean;
};

export type ProductVariantType = {
  id: number;
  name: string;
  price: number;
  price_per_unit: number;
  in_stock: number;
};

export type ProductRatingType = {
  total_ratings: number;
  avg_rating: number;
  total_recommended: number;
  rates: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
};
export type ProductDetailsType = {
  images: { url: string; id: number }[];
  name: string;
  manufacturer_marketer: string;
  return_policy: string;
  consume_type: string;
  variants: ProductVariantType[];
  expire: string;
  product_information: string;
  reviews: ReviewType[];
  ratings: ProductRatingType;
};
