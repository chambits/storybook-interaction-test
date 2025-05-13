import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutPage } from "./CheckoutPage";

const meta = {
  title: "Pages/CheckoutPage",
  component: CheckoutPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  parameters: {
    stores: {
      checkout: {
        order: null,
        isSubmitting: false,
        isSuccess: false,
        loadOrderFromStorage: () => false,
      },
    },
  },
};

export const WithItems: Story = {
  parameters: {
    stores: {
      checkout: {
        order: {
          restaurantId: 1,
          restaurantName: "Burger Kingdom",
          items: [
            {
              name: "Cheeseburger",
              description: "Nice grilled burger with cheese",
              price: 8.5,
              quantity: 1,
            },
            {
              name: "Fries",
              description: "Fried french fries",
              price: 2.5,
              quantity: 2,
            },
          ],
          total: 13.5,
        },
        isSubmitting: false,
        isSuccess: false,
        loadOrderFromStorage: () => true,
      },
    },
  },
};
