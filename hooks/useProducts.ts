import { API_URL } from '@/config';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from './useAuth';
import { PriceEntry, PriceEntriesFindResponse } from '@/types/priceEntries';
import { Product } from '@/types/products';

function groupByProducts(collection: PriceEntry[]) {
  return collection.reduce((acc: Product[], item) => {
    const ean = item.attributes.ean;

    if (!acc.find((item) => item.ean === ean)) {
      acc.push({
        ean: item.attributes.ean,
        name: item.attributes.product.data.attributes.name,
        photoPath: item.attributes.product.data.attributes.photoPath,
      });
    }

    return acc;
  }, []);
}

export const useProducts = () => {
  const { jwtToken, isLoggedIn } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchPriceEntries = async () => {
    const response = await fetch(`${API_URL}/api/price-entries?populate=*`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = (await response.json()) as unknown as PriceEntriesFindResponse;
    console.log(data);

    return data;
  };

  const fetchProductData = async () => {
    const response = await fetch(`${API_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = (await response.json()) as unknown as PriceEntriesFindResponse;
    console.log(data);

    return data;
  };

  useEffect(() => {
    if (isLoggedIn)
      fetchPriceEntries()
        .then((data) => {
          const products = groupByProducts(data.data);
          setProducts(products);
        })
        .catch((error) => {
          console.error('Error fetching price entries:', error);
        });
  }, []);

  return {
    products,
  };
};
