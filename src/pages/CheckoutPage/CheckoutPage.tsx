import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutPageHeader } from "@/features/checkout/PageHeader";
import { SuccessCard } from "@/features/checkout/SuccessCard";
import { CheckoutForm } from "@/features/checkout/CheckoutForm";
import { useCheckoutStore } from "@/features/checkout/store";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { order, isSubmitting, isSuccess, loadOrderFromStorage, submitOrder } =
    useCheckoutStore();

  useEffect(() => {
    const orderLoaded = loadOrderFromStorage();
    if (!orderLoaded) {
      navigate("/");
    }
  }, [navigate, loadOrderFromStorage]);

  const handleSubmitOrder = () => {
    submitOrder(() => navigate("/"));
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
      <CheckoutPageHeader onGoBack={handleGoBack} />
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
};
