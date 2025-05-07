import { defineConfig, type UserConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
} as UserConfig);

// export default defineConfig({
//   plugins: [react()],
//   base:
//     process.env.NODE_ENV === "production"
//       ? "/product-admin-dashboard/login"
//       : "/",
//   test: {
//     environment: "jsdom",
//     globals: true,
//     setupFiles: "./src/test/setup.ts",
//     testTimeout: 1000 * 60,
//   },
// } as UserConfig);
