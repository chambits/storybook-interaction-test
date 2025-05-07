import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Restaurant } from "@/types";
import { Clock, MapPin, Phone, Star, Utensils } from "lucide-react";

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

export default function RestaurantDetails({
  restaurant,
}: RestaurantDetailsProps) {
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{restaurant.name}</CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
                <span>{restaurant.rating} very good</span>
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {restaurant.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{restaurant.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">{restaurant.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Hours</h3>
                <p className="text-muted-foreground">{restaurant.hours}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">{restaurant.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Utensils className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Price Range</h3>
                <p className="text-muted-foreground">{restaurant.priceRange}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
