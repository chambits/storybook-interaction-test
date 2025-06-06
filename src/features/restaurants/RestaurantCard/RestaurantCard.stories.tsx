import "@/index.css";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { RestaurantCard } from "./RestaurantCard";

const meta: Meta<typeof RestaurantCard> = {
  title: "Features/Restaurants/RestaurantCard",
  component: RestaurantCard,
  parameters: {
    layout: "centered",
  },
  args: {
    restaurant: {
      id: 1,
      name: "Burger Kingdom",
      image: "burger.jpg",
      rating: 4.2,
      description: "Nicest place for burgers",
      isNew: true,
      isClosed: false,
      categories: ["Burgers", "Comfort Food"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RestaurantCard>;

// Default story
export const Default: Story = {};

// Story showing a non-new restaurant
export const NotNew: Story = {
  args: {
    restaurant: {
      id: 2,
      name: "Pizza Palace",
      image: "pizza.jpg",
      rating: 4.5,
      description: "Authentic Italian pizzas",
      isNew: false,
      isClosed: false,
      categories: ["Pizza", "Italian"],
    },
  },
};

// Story with a closed restaurant
export const Closed: Story = {
  args: {
    restaurant: {
      id: 2,
      name: "Pizza Palace",
      image: "pizza.jpg",
      rating: 4.5,
      description: "Authentic Italian pizzas",
      isNew: false,
      isClosed: true,
      categories: ["Pizza", "Italian"],
    },
  },
};

// Story with interaction testing
export const CardInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Hover over the card to see the hover effect
    await userEvent.hover(canvas.getByRole("link"));

    // We could click the card to simulate navigation
    // Uncomment to test click behavior
    // await userEvent.click(canvas.getByRole('link'));
  },
};

// Story with multiple categories
export const MultipleCategories: Story = {
  args: {
    restaurant: {
      id: 3,
      name: "Fusion Kitchen",
      image: "curry.jpg",
      rating: 4.8,
      description: "A blend of world cuisines",
      isNew: true,
      isClosed: false,
      categories: ["Asian", "European", "Fusion", "Vegetarian", "Seafood"],
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
