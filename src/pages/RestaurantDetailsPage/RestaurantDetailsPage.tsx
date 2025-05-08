import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "@/features/restaurants/Menu";
import { RestaurantDetails } from "@/features/restaurants/RestaurantDetails";
import RestaurantHeader from "@/features/restaurants/RestaurantHeader";
import { Reviews } from "@/features/restaurants/Reviews";
import { useRestaurants } from "@/hooks/useRestaurants";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function RestaurantDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getRestaurantById } = useRestaurants();
  const restaurant = getRestaurantById(Number(id));

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Restaurants
          </Button>
        </div>

        <RestaurantHeader restaurant={restaurant} />

        <div>
          <RestaurantDetails restaurant={restaurant} />

          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="menu" className="mt-4">
              <Menu restaurant={restaurant} />
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <Reviews reviews={restaurant.reviews} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
