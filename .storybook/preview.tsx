import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { userEvent } from "@storybook/test";
import { demoModeLoader } from "./demo-mode";
initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader, demoModeLoader],
};

declare module "storybook/internal/csf" {
  interface StoryContext {
    userEvent: ReturnType<typeof userEvent.setup>;
  }
}

export default preview;
