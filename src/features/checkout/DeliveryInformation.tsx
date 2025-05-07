import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DeliveryInformation() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Delivery Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Delivery details would be collected here in a real application.
        </p>
      </CardContent>
    </Card>
  );
}
