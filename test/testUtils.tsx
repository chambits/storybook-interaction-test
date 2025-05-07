import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import { ThemeProvider } from "@/components/ThemeContextProvider";

/**
 * Creates a wrapper with QueryClientProvider for testing hooks that use React Query
 */
export function createQueryClientWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

/**
 * Main test wrapper that combines all context providers
 * Add more providers here as needed (theme, router, etc.)
 */
export function createTestWrapper() {
  return ({ children }: { children: React.ReactNode }) => {
    const QueryWrapper = createQueryClientWrapper();
    return (
      <QueryWrapper>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </QueryWrapper>
    );
  };
}

/**
 * Helper to mock fetch responses for testing
 */
export function setupFetchMock(data: any, ok = true) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data),
    } as Response)
  );
}
