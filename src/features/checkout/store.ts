import { create } from "zustand";
import { Order, REDIRECT_DELAY, PROCESSING_DELAY } from "./types";

interface CheckoutState {
  order: Order | null;
  isSubmitting: boolean;
  isSuccess: boolean;

  setOrder: (order: Order) => void;
  loadOrderFromStorage: () => boolean;
  submitOrder: (callback: () => void) => void;
  clearOrder: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  order: null,
  isSubmitting: false,
  isSuccess: false,

  setOrder: (order) => set({ order }),

  loadOrderFromStorage: () => {
    const orderData = sessionStorage.getItem("currentOrder");
    if (!orderData) {
      return false;
    }

    try {
      const parsedOrder = JSON.parse(orderData);
      set({ order: parsedOrder });
      return true;
    } catch (error) {
      console.error("Failed to parse order data", error);
      return false;
    }
  },

  submitOrder: (callback) => {
    set({ isSubmitting: true });

    setTimeout(() => {
      set({ isSubmitting: false, isSuccess: true });
      sessionStorage.removeItem("currentOrder");

      setTimeout(() => {
        callback();
        set({ isSuccess: false, order: null });
      }, REDIRECT_DELAY);
    }, PROCESSING_DELAY);
  },

  clearOrder: () => {
    sessionStorage.removeItem("currentOrder");
    set({ order: null, isSubmitting: false, isSuccess: false });
  },
}));
