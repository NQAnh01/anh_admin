type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
};

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  total: number;
  status: string;
  createdAt: string;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  quantity: number;
};

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
};

type HandmadeType = {
  _id: string;
  title: string;
  customer: string;
  createdAt: string;
};
