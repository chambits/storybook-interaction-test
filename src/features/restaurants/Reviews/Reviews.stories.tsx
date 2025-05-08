import type { Meta, StoryObj } from "@storybook/react";
import { Reviews } from "./Reviews";
import "@/index.css";
import { ThemeProvider } from "@/providers/ThemeContextProvider";

const meta: Meta<typeof Reviews> = {
  title: "Features/Restaurants/Reviews",
  component: Reviews,
  parameters: {
    layout: "centered",
  },
  // Default reviews data
  args: {
    reviews: [
      {
        author: "John D.",
        rating: 5,
        comment:
          "Best burgers in town! The special sauce is amazing and the service was excellent.",
      },
      {
        author: "Sarah M.",
        rating: 4,
        comment:
          "Great food, but can get crowded during lunch hours. I recommend coming in the evening.",
      },
    ],
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Reviews>;

// Default story with two reviews
export const Default: Story = {};

// Story with multiple reviews
export const MultipleReviews: Story = {
  args: {
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
      {
        author: "Mike R.",
        rating: 5,
        comment: "Authentic taste. Reminds me of my hometown!",
      },
      {
        author: "Lisa T.",
        rating: 4,
        comment:
          "Delicious food, but a bit pricey. Worth it for special occasions.",
      },
      {
        author: "Robert L.",
        rating: 5,
        comment: "The best meal I've had in months. Cooked to perfection!",
      },
    ],
  },
};

// Story with mixed ratings
export const MixedRatings: Story = {
  args: {
    reviews: [
      {
        author: "Emma L.",
        rating: 5,
        comment:
          "The freshest ingredients I've had outside of a farmer's market!",
      },
      {
        author: "David K.",
        rating: 3,
        comment: "Average quality. Nothing special but nothing bad either.",
      },
      {
        author: "Sophia W.",
        rating: 2,
        comment: "Service was slow and food was just okay. Expected better.",
      },
      {
        author: "James T.",
        rating: 4,
        comment: "Delicious but slightly expensive for what you get.",
      },
    ],
  },
};

// Story with a single review
export const SingleReview: Story = {
  args: {
    reviews: [
      {
        author: "Carlos R.",
        rating: 5,
        comment:
          "Authentic flavors that remind me of home. The chef clearly knows what they're doing!",
      },
    ],
  },
};

// Dark theme story
export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="storybook-theme">
        <div className="p-6 bg-background" style={{ width: "600px" }}>
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
