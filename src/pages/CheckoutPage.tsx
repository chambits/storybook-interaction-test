import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import components from features/checkout
import {
  Order,
  REDIRECT_DELAY,
  PROCESSING_DELAY,
} from "@/features/checkout/types";
import { PageHeader } from "@/features/checkout/PageHeader";
import { SuccessCard } from "@/features/checkout/SuccessCard";
import { CheckoutForm } from "@/features/checkout/CheckoutForm";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    loadOrderFromStorage();
  }, [navigate]);

  const loadOrderFromStorage = () => {
    const orderData = sessionStorage.getItem("currentOrder");
    if (!orderData) {
      navigate("/");
      return;
    }

    try {
      setOrder(JSON.parse(orderData));
    } catch (error) {
      console.error("Failed to parse order data", error);
      navigate("/");
    }
  };

  const handleSubmitOrder = () => {
    setIsSubmitting(true);

    // Simulate order submission with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      sessionStorage.removeItem("currentOrder");

      setTimeout(() => navigate("/"), REDIRECT_DELAY);
    }, PROCESSING_DELAY);
  };

  const handleGoBack = () => navigate(-1);

  if (!order) {
    return (
      <div className="container py-8">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <PageHeader onGoBack={handleGoBack} />
      {isSuccess ? (
        <SuccessCard restaurantName={order.restaurantName} />
      ) : (
        <CheckoutForm
          order={order}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitOrder}
        />
      )}
    </div>
  );
}
