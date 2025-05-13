import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { RestaurantDetailsPage } from "@/pages/RestaurantDetailsPage";
import { CheckoutPage } from "@/pages/CheckoutPage";

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};

export const AppRoutes: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {children}
      </Routes>
    </ScrollToTop>
  );
};
