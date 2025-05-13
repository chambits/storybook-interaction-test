import "@/index.css";
import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantDetails } from "./RestaurantDetails";

const meta: Meta<typeof RestaurantDetails> = {
  title: "Features/Restaurants/RestaurantDetails",
  component: RestaurantDetails,
  parameters: {
    layout: "centered",
  },
  args: {
    restaurant: {
      id: 1,
      name: "Burger Kingdom",
      image: "burger.jpg",
      rating: 4.2,
      description:
        "Nicest place for burgers with a variety of options for all tastes. Our specialty is the Classic Burger with our secret sauce.",
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
      ],
      reviews: [
        {
          author: "John D.",
          rating: 5,
          comment: "Best burgers in town! The special sauce is amazing.",
        },
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RestaurantDetails>;

// Default story
export const Default: Story = {};

// Italian restaurant with different categories
export const ItalianRestaurant: Story = {
  args: {
    restaurant: {
      id: 2,
      name: "Pizza Paradise",
      image: "pizza.jpg",
      rating: 4.5,
      description:
        "Authentic Italian pizzas made with traditional recipes and the freshest ingredients.",
      isNew: false,
      isClosed: false,
      categories: ["Pizza", "Italian", "Pasta"],
      address: "456 Flour Avenue, Foodville",
      hours: "11:00 AM - 11:00 PM",
      priceRange: "$$",
      phone: "(555) 987-6543",
      menu: [
        {
          name: "Margherita",
          price: 12.99,
          description: "Classic tomato sauce, mozzarella, and basil",
        },
      ],
      reviews: [
        {
          author: "Mike R.",
          rating: 5,
          comment: "Authentic Italian taste. Reminds me of Naples!",
        },
      ],
    },
  },
};

// High-end restaurant with $$$ price range
export const HighEndRestaurant: Story = {
  args: {
    restaurant: {
      id: 6,
      name: "Steakhouse Supreme",
      image: "steak.jpg",
      rating: 4.7,
      description:
        "Juicy steaks cooked to perfection with a selection of premium wines.",
      isNew: true,
      isClosed: false,
      categories: ["Steakhouse", "Fine Dining", "Grill"],
      address: "963 Grill Road, Foodville",
      hours: "5:00 PM - 11:00 PM",
      priceRange: "$$$",
      phone: "(555) 789-0123",
      menu: [
        {
          name: "Ribeye Steak",
          price: 29.99,
          description: "Tender ribeye with a side of garlic mashed potatoes",
        },
      ],
      reviews: [
        {
          author: "Robert L.",
          rating: 5,
          comment: "The best steak I've ever had. Cooked to perfection!",
        },
      ],
    },
  },
};

// Dark theme story
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    themes: {
      default: "dark",
    },
  },
};

// Closed restaurant story
export const ClosedRestaurant: Story = {
  args: {
    restaurant: {
      id: 5,
      name: "Pasta Palace",
      image: "pasta.jpg",
      rating: 4.6,
      description: "The best handmade pasta in town, made fresh daily.",
      isNew: false,
      isClosed: true,
      categories: ["Italian", "Pasta"],
      address: "852 Noodle Lane, Foodville",
      hours: "11:00 AM - 10:00 PM",
      priceRange: "$$",
      phone: "(555) 678-9012",
      menu: [
        {
          name: "Spaghetti Carbonara",
          price: 14.99,
          description: "Classic carbonara with pancetta and parmesan cheese",
        },
      ],
      reviews: [
        {
          author: "Maria G.",
          rating: 5,
          comment: "Authentic and flavorful! Feels like eating in Italy.",
        },
      ],
    },
  },
};
