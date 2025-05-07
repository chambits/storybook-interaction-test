export type Restaurant = {
  id: number;
  name: string;
  image: string;
  rating: number;
  description: string;
  isNew: boolean;
  categories: string[];
  address: string;
  hours: string;
  priceRange: string;
  phone: string;
  menu: MenuItem[];
  reviews: Review[];
};

export type Review = {
  author: string;
  rating: number;
  comment: string;
};

export type MenuItem = {
  name: string;
  price: number;
  description: string;
};
