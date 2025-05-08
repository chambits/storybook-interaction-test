import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";
import "@/index.css";
import { ThemeProvider } from "@/providers/ThemeContextProvider";
import { BrowserRouter } from "react-router-dom";
import { within, userEvent } from "@storybook/test";

const meta: Meta<typeof Menu> = {
  title: "Features/Restaurants/Menu",
  component: Menu,
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
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// Default story
export const Default: Story = {};

// Pizza restaurant with different menu items
export const PizzaMenu: Story = {
  args: {
    restaurant: {
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
      menu: [
        {
          name: "Margherita",
          price: 12.99,
          description: "Classic tomato sauce, mozzarella, and basil",
        },
        {
          name: "Pepperoni",
          price: 14.99,
          description: "Tomato sauce, mozzarella, and pepperoni",
        },
        {
          name: "Vegetarian",
          price: 13.99,
          description: "Tomato sauce, mozzarella, and assorted vegetables",
        },
        {
          name: "Hawaiian",
          price: 15.99,
          description: "Tomato sauce, mozzarella, ham, and pineapple",
        },
      ],
      reviews: [],
    },
  },
};

// Menu with higher priced items
export const HighPriceMenu: Story = {
  args: {
    restaurant: {
      id: 6,
      name: "Steakhouse Supreme",
      image: "steak.jpg",
      rating: 4.7,
      description: "Juicy steaks cooked to perfection",
      isNew: true,
      isClosed: false,
      categories: ["Steakhouse", "Fine Dining"],
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
        {
          name: "Filet Mignon",
          price: 34.99,
          description: "Premium filet mignon with red wine reduction sauce",
        },
        {
          name: "T-Bone Steak",
          price: 27.99,
          description: "Chargrilled T-bone with roasted vegetables",
        },
        {
          name: "Grilled Lamb Chops",
          price: 25.99,
          description: "Herb-marinated lamb chops served with mint sauce",
        },
      ],
      reviews: [],
    },
  },
};

// Story with interaction testing
export const AddItemsToOrder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add first item to the order
    await userEvent.click(canvas.getAllByTestId("increase-0")[0]);

    // Add second item to the order twice
    await userEvent.click(canvas.getAllByTestId("increase-1")[0]);
    await userEvent.click(canvas.getAllByTestId("increase-1")[0]);

    // Remove one of the second item
    await userEvent.click(canvas.getAllByTestId("decrease-1")[0]);

    // Try to place an order, though this would navigate in a real app
    // so we won't be able to see the result in Storybook
    await userEvent.click(canvas.getByTestId("place-order-button"));
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
