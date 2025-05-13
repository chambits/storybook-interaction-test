import "@/index.css";
import { ThemeProvider } from "@/providers/ThemeContextProvider";
import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RestaurantDetailsPage } from "./RestaurantDetailsPage";

const sampleRestaurant = {
  id: 1,
  name: "Burger Kingdom",
  image: "burger.jpg",
  rating: 4.2,
  description:
    "Nicest place for burgers with a variety of options including vegetarian choices.",
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
    {
      name: "Bacon Burger",
      price: 10.99,
      description: "Classic burger with crispy bacon",
    },
    {
      name: "Veggie Burger",
      price: 8.99,
      description: "Plant-based patty with all the fixings",
    },
  ],
  reviews: [
    {
      author: "John D.",
      rating: 5,
      comment: "Best burgers in town! The special sauce is amazing.",
    },
    {
      author: "Sarah M.",
      rating: 4,
      comment: "Great food, but can get crowded during lunch hours.",
    },
  ],
};

// Sample restaurants data (for the getRestaurantById function)
const sampleRestaurants = [sampleRestaurant];

const RestaurantDetailsPageWithProviders = () => {
  return (
    <MemoryRouter initialEntries={[`/restaurant/${sampleRestaurant.id}`]}>
      <Routes>
        <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
};

const meta = {
  title: "Pages/RestaurantDetailsPage",
  component: RestaurantDetailsPageWithProviders,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        http.get("http://localhost:3001/restaurants", () => {
          console.log("MSW intercepted request for restaurants");
          return HttpResponse.json(sampleRestaurants);
        }),
      ],
    },
    deeplink: "/restaurant/1",
  },
} satisfies Meta<typeof RestaurantDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with restaurant data
export const Default: Story = {};

// Loading state - delay the response to show loading state
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3001/restaurants", async () => {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          return HttpResponse.json(sampleRestaurants);
        }),
      ],
    },
  },
};

// Error state
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3001/restaurants", () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};

// Restaurant not found state
export const RestaurantNotFound: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3001/restaurants", () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};

// Dark theme
export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="storybook-theme">
        <div className="bg-background min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: { default: "dark" },
    themes: {
      default: "dark",
    },
  },
};
