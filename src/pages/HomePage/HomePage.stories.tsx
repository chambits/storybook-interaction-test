import "@/index.css";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import { ThemeProvider } from "@/providers/ThemeContextProvider";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      },
    },
  });

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

const HomePageWithProviders = () => {
  const queryClient = createQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const meta = {
  title: "Pages/HomePage",
  component: HomePageWithProviders,
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
} satisfies Meta<typeof HomePageWithProviders>;

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

// // Error state
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
