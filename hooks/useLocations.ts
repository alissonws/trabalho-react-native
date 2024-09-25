import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { Location, LocationsFindResponse } from '@/types/locations';

export const useLocations = () => {
  const { jwtToken } = useAuth();
  const [locations, setLocations] = useState<Location[]>([]);

  const fetchLocations = async () => {
    const response = await fetch(
      `${API_URL}/api/locations`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    const data = (await response.json()) as unknown as LocationsFindResponse;

    return data;
  };

  useEffect(() => {
    fetchLocations().then((data) => {
      setLocations(data.data);
    });
  }, []);

  return {
    locations,
  };
};
