import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import { ThemeProvider } from "./components/ThemeContextProvider";
import MainLayout from "@/layouts/MainLayout";
import RestaurantDetailsPage from "@/pages/RestaurantDetailsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MainLayout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/restaurant/:id"
                element={<RestaurantDetailsPage />}
              />
            </Routes>
          </BrowserRouter>
        </MainLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
