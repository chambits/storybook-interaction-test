import { useCheckoutStore } from "@/features/checkout/store";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { CheckoutPage } from "./CheckoutPage";

const meta = {
  title: "Pages/CheckoutPage",
  component: CheckoutPage,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  decorators: [
    (Story) => {
      useCheckoutStore.setState({
        order: null,
        isSubmitting: false,
        isSuccess: false,
        loadOrderFromStorage: () => false,
      });
      return <Story />;
    },
  ],
};

export const WithItems: Story = {
  decorators: [
    (Story) => {
      useCheckoutStore.setState({
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
      });
      return <Story />;
    },
  ],
};
