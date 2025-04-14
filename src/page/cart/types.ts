export interface CartDataType {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    productName: string;
    price: number;
    sellingPrice: number;
    mrp: number;
    image?: string;
    images?: string[];
    variants?: {
      id: string;
      name: string;
      price: number;
    }[];
  };
  // Add other cart item properties as needed
} 