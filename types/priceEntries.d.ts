import { Product } from "./products";

export type PriceEntriesFindResponse = {
  data: PriceEntry[];
};

export type PriceEntry = {
  id: number;
  attributes: {
    ean: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    latitude: number;
    longitude: number;
    location: {
      data: {
        id: number;
        attributes: {
          name: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      };
    };
    product: {
      data: {
        id: number;
        attributes: Product;
      };
    }
    user: {
      data: {
        id: number;
        attributes: {
          name: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      };
    };
  };
};
