import type { Restaurant } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useRestaurants = () => {
  const { data, isLoading, error } = useQuery<Restaurant[]>({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/restaurants");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const getRestaurantById = (id: number) => {
    return data?.find((restaurant: Restaurant) => restaurant.id == id);
  };

  return { restaurants: data, getRestaurantById, isLoading, error };
};
