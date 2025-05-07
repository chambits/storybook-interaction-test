import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Menu from "@/features/restaurants/Menu";
import RestaurantDetails from "@/features/restaurants/RestaurantDetails";
import RestaurantHeader from "@/features/restaurants/RestaurantHeader";
import Reviews from "@/features/restaurants/Reviews";
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <RestaurantDetails restaurant={restaurant} />

            <Menu menu={restaurant.menu} />

            {/* Reviews Section */}
            <Reviews reviews={restaurant.reviews} />

            {/* <Tabs defaultValue="menu" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="menu" className="mt-4">
                <div className="grid grid-cols-1 gap-4">
                  {restaurant.menu.map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <span className="font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="grid grid-cols-1 gap-4">
                  {restaurant.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {review.author}
                          </CardTitle>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
                            <span>{review.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs> */}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Online</CardTitle>
                <CardDescription>
                  Place your order for pickup or delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  Delivery
                </Button>
                <Button variant="outline" className="w-full">
                  Pickup
                </Button>
              </CardContent>
              <Separator />
              <CardFooter className="flex flex-col items-start pt-6">
                <div className="w-full space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      {restaurant.hours}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Phone</h4>
                    <p className="text-sm text-muted-foreground">
                      {restaurant.phone}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Address</h4>
                    <p className="text-sm text-muted-foreground">
                      {restaurant.address}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
