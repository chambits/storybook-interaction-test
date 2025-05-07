import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Order, OrderItem as OrderItemType, DELIVERY_FEE } from "./types";

function OrderItem({ item }: { item: OrderItemType }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <div>
        <span className="font-medium">{item.name}</span>
        <span className="text-sm text-muted-foreground ml-2">
          x{item.quantity}
        </span>
      </div>
      <span>${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  );
}

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const totalPrice = order.total + DELIVERY_FEE;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          From {order.restaurantName}
        </p>

        <div className="space-y-4">
          {order.items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          <p className="text-muted-foreground">
            Subtotal: ${order.total.toFixed(2)}
          </p>
          <p className="text-muted-foreground">
            Delivery Fee: ${DELIVERY_FEE.toFixed(2)}
          </p>
          <p className="font-bold mt-2">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
