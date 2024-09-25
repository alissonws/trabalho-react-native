import { API_URL } from '@/config';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from './useAuth';
import { PriceEntry, PriceEntriesFindResponse } from '@/types/priceEntries';

export const usePriceEntries = (ean: string) => {
  const { jwtToken } = useAuth();
  const [entries, setEntries] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPriceEntries = async () => {
    const response = await fetch(
      `${API_URL}/api/price-entries?filters[ean][$eq]=${ean}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    const data = (await response.json()) as unknown as PriceEntriesFindResponse;
    console.log(data);

    return data;
  };

  useEffect(() => {
    fetchPriceEntries()
      .then((data) => {
        setEntries(data.data);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
      });
  }, [ean]);

  return {
    entries,
    loading,
    error,
  };
};
