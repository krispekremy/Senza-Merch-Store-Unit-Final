export type Merch = {
  id: number;
  name: string;
  description: string;
  sizes: string;
  price: number;
  quantityInStock: number;
  category: string;
  image: string;
};

export type CartItem = {
  id: number;
  productId: number;
  amount: number;
};

//setup my types here for easy exporting
