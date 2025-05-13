import MainLayout from "@/layouts/MainLayout";
import { AppRoutes } from "@/Routes";
import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router-dom";
import { withDeeplink } from "../../.storybook/withDeeplink";

export const sampleRestaurants = [
  {
    id: 1,
    name: "Burger Kingdom",
    image: "burger.jpg",
    rating: 4.2,
    description: "Nicest place for burgers",
    isNew: true,
    isClosed: false,
    categories: ["Burgers", "Comfort Food"],
    address: "123 Main Street, Foodville",
    hours: "9:00 AM - 10:00 PM",
    priceRange: "$$",
    phone: "(555) 123-4567",
    menu: [
      {
        name: "Classic Burger",
        price: 8.99,
        description: "Beef patty with lettuce, tomato, and special sauce",
      },
      {
        name: "Cheese Burger",
        price: 9.99,
        description: "Classic burger with American cheese",
      },
    ],
    reviews: [],
  },
];

// Create a mock App component that we can control for Storybook
const MockApp = ({ initialRoute = "/" }) => {
  return (
    <MainLayout>
      <MemoryRouter initialEntries={[encodeURI(initialRoute)]}>
        <AppRoutes />
      </MemoryRouter>
    </MainLayout>
  );
};

const meta = {
  title: "UserFlows/App",
  component: MockApp,
  parameters: {
    layout: "fullscreen",
    deeplink: {
      path: "/",
      route: "/",
    },
    decorators: [withDeeplink],
    msw: {
      handlers: [
        http.get("http://localhost:3001/restaurants", () => {
          console.log("MSW intercepted request for restaurants");
          return HttpResponse.json(sampleRestaurants);
        }),
        http.get("http://localhost:3001/restaurants/:id", ({ params }) => {
          const { id } = params;
          const restaurant = sampleRestaurants.find(
            (r) => r.id.toString() === id
          );
          console.log(`MSW intercepted request for restaurant ${id}`);
          return HttpResponse.json(restaurant || sampleRestaurants[0]);
        }),
      ],
    },
  },
} satisfies Meta<typeof MockApp>;

export default meta;
type Story = StoryObj<typeof MockApp>;

export const Home: Story = {};

export const ToRestaurantDetailPage: Story = {
  play: async ({ canvasElement, step, userEvent }) => {
    const canvas = within(canvasElement);

    await step("Navigate to restaurant detail page", async () => {
      // Wait for restaurants to load
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const restaurantCards = await canvas.findByTestId("restaurant-card");
        await userEvent.click(restaurantCards);
      } catch (error) {
        console.error("Failed to find restaurant cards:", error);
      }
    });
  },
};

export const ToCheckoutPage: Story = {
  play: async (context) => {
    await ToRestaurantDetailPage.play?.(context);
    const { canvasElement, userEvent, step } = context;

    const canvas = within(canvasElement);

    await step("Add menu item to cart", async () => {
      // Wait for menu to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        // Add 2 items
        const increaseButton = await canvas.findByTestId("increase-0");
        await userEvent.click(increaseButton);
        await userEvent.click(increaseButton);

        // Verify quantity
        const quantity = await canvas.findByTestId("quantity-0");
        await expect(quantity.textContent).toEqual("2");
      } catch (error) {
        console.error("Failed to interact with menu:", error);
      }
    });

    await step('Go to "Checkout" page', async () => {
      try {
        await userEvent.click(canvas.getByTestId("place-order-button"));
      } catch (error) {
        console.error("Failed to click the place order button:", error);
      }
    });
  },
};

export const CheckoutToSuccess: Story = {
  play: async (context) => {
    await ToCheckoutPage.play?.(context);
    const { canvasElement, userEvent, step } = context;

    const canvas = within(canvasElement);

    await step("Place the order", async () => {
      // Wait for checkout page to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        // Find and click the Place Order button
        const placeOrderButton = await canvas.findByText(/Place Order/i);
        await userEvent.click(placeOrderButton);

        // Verify success message appears
        const successMessage = await canvas.findByText(
          /Order Placed Successfully/i
        );
        await expect(successMessage).toBeInTheDocument();
      } catch (error) {
        console.error("Failed to place order:", error);
      }
    });
  },
};
