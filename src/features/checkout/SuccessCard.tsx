import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface SuccessCardProps {
  restaurantName: string;
}

export function SuccessCard({ restaurantName }: SuccessCardProps) {
  return (
    <Card className="text-center p-8">
      <CardContent className="pt-6">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-muted-foreground">
          Thank you for your order from {restaurantName}.
        </p>
        <p className="text-muted-foreground mt-1">
          Redirecting to home page...
        </p>
      </CardContent>
    </Card>
  );
}
