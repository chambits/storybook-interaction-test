import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeContextProvider";
import MainLayout from "@/layouts/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./Routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MainLayout>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </MainLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
