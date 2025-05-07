import Image from "@/components/Image";
import { getImageUrl } from "@/lib/utils";
import type { Restaurant } from "@/types";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  return (
    <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden">
      <Image
        src={getImageUrl("food", restaurant.image)}
        alt={restaurant.name}
        className="w-full h-64 md:h-80 object-cover"
        loading="lazy"
      />
      {restaurant.isNew && (
        <div className="absolute top-4 left-4 bg-[#e8f5c8] text-black text-sm font-medium px-3 py-1 rounded">
          new
        </div>
      )}
    </div>
  );
}
