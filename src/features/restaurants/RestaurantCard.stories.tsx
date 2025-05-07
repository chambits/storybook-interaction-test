// src/features/restaurants/RestaurantCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import RestaurantCard from "./RestaurantCard";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";

// Wrap the component in BrowserRouter since it uses Link
// const RestaurantCardWithRouter = (args) => (
//   <BrowserRouter>
//     <RestaurantCard {...args} />
//   </BrowserRouter>
// );

const meta: Meta<typeof RestaurantCard> = {
  title: "Features/Restaurants/RestaurantCard",
  component: RestaurantCard,
  // Use a decorator to provide the router context
  decorators: [(Story) => <BrowserRouter>{Story()}</BrowserRouter>],
  parameters: {
    layout: "centered",
  },
  // Sample restaurant data
  args: {
    restaurant: {
      id: 1,
      name: "Burger Kingdom",
      image: "burger.jpg",
      rating: 4.2,
      description: "Nicest place for burgers",
      isNew: true,
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
      categories: ["Asian", "European", "Fusion", "Vegetarian", "Seafood"],
    },
  },
};
