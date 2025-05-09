import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import { Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  description: string;
  isNew: boolean;
  isClosed?: boolean;
  categories: string[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className={cn(
        "block h-full",
        restaurant.isClosed && "pointer-events-none"
      )}
    >
      <Card
        className={cn(
          "overflow-hidden h-full transition-all hover:shadow-md",
          restaurant.isClosed && "opacity-60 grayscale"
        )}
        data-testid="restaurant-card"
      >
        <div className="relative bg-muted">
          <Image
            src={getImageUrl("food", restaurant.image)}
            alt={restaurant.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          {restaurant.isNew && (
            <div className="absolute top-2 left-2 bg-[#e8f5c8] text-black text-xs font-medium px-2 py-1 rounded">
              new
            </div>
          )}
          {restaurant.isClosed && (
            <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
              <Clock className="h-3 w-3" />
              closed
            </div>
          )}
        </div>
        <CardHeader className="p-4 pb-0">
          <CardTitle>{restaurant.name}</CardTitle>
          <CardDescription className="flex items-center">
            <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
            <span>{restaurant.rating} very good</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-sm text-muted-foreground">
            {restaurant.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {restaurant.categories.map((category, index) => (
              <Badge
                key={index}
                variant="outline"
                className="font-normal text-xs"
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
