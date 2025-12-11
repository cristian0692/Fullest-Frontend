import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:url";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./FullestFrontEnd/src/components/"),
      },
      { find: "!", replacement: resolve(__dirname, "./FullestFrontEnd/src/") },
      { find: "?/", replacement: resolve(__dirname, "./Shared/") },
    ],
  },
});
