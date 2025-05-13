import type { Decorator, Preview } from "@storybook/react";
import { userEvent } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialize, mswLoader } from "msw-storybook-addon";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  CheckoutState,
  useCheckoutStore,
} from "../src/features/checkout/store";
import { ThemeProvider } from "../src/providers/ThemeContextProvider";
import { demoModeLoader } from "./demo-mode";

initialize();

export const withRouter: Decorator = (
  StoryFn,
  { parameters: { deeplink } }
) => {
  // if there's a deeplink, routing will be handled in another decorator
  if (deeplink) {
    return <StoryFn />;
  }

  return (
    <BrowserRouter>
      <StoryFn />
    </BrowserRouter>
  );
};

export const withTheme: Decorator = (
  StoryFn,
  { globals: { theme = "light" } }
) => {
  return (
    <ThemeProvider defaultTheme={theme} storageKey="storybook-theme">
      <StoryFn />
    </ThemeProvider>
  );
};

export const withStore: Decorator = (StoryFn, { parameters }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      },
    },
  });

  if (parameters?.stores) {
    Object.entries(parameters.stores).forEach(([storeName, initialState]) => {
      switch (storeName) {
        case "checkout":
          useCheckoutStore.setState(initialState as CheckoutState);
          break;
        default:
          console.warn(`Unknown store: ${storeName}`);
      }
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StoryFn />
    </QueryClientProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withTheme, withStore, withRouter],
  loaders: [mswLoader, demoModeLoader],
};

declare module "storybook/internal/csf" {
  interface StoryContext {
    userEvent: ReturnType<typeof userEvent.setup>;
  }
}

export default preview;
