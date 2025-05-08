import { RestaurantCard } from "@/features/restaurants/RestaurantCard";
import { Input } from "@/components/ui/input";
import { useRestaurants } from "@/hooks/useRestaurants";
import { Search } from "lucide-react";

export const HomePage = () => {
  const { restaurants } = useRestaurants();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for restaurants or cuisines..."
            className="pl-10 w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants?.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};
