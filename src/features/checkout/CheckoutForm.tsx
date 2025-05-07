import { Button } from "@/components/ui/button";
import { Order } from "./types";
import { OrderSummary } from "./OrderSummary";
import { DeliveryInformation } from "./DeliveryInformation";

interface CheckoutFormProps {
  order: Order;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function CheckoutForm({
  order,
  isSubmitting,
  onSubmit,
}: CheckoutFormProps) {
  return (
    <>
      <OrderSummary order={order} />
      <DeliveryInformation />
      <div className="flex justify-end">
        <Button size="lg" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </>
  );
}
