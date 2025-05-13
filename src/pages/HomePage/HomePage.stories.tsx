import "@/index.css";
import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { HomePage } from "./HomePage";

const sampleRestaurants = [
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
    menu: [],
    reviews: [],
  },
  {
    id: 2,
    name: "Pizza Paradise",
    image: "pizza.jpg",
    rating: 4.5,
    description: "Authentic Italian pizzas",
    isNew: false,
    isClosed: false,
    categories: ["Pizza", "Italian"],
    address: "456 Flour Avenue, Foodville",
    hours: "11:00 AM - 11:00 PM",
    priceRange: "$$",
    phone: "(555) 987-6543",
    menu: [],
    reviews: [],
  },
  {
    id: 3,
    name: "Sushi Sensation",
    image: "sushi.jpg",
    rating: 4.8,
    description: "Fresh and delicious sushi",
    isNew: true,
    isClosed: false,
    categories: ["Japanese", "Sushi"],
    address: "789 Ocean Drive, Foodville",
    hours: "12:00 PM - 10:00 PM",
    priceRange: "$$$",
    phone: "(555) 456-7890",
    menu: [],
    reviews: [],
  },
];

const meta = {
  title: "Pages/HomePage",
  component: HomePage,
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
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    themes: {
      default: "dark",
    },
  },
};
