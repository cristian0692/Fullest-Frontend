import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "./main/src/components/") },
      { find: "!", replacement: resolve(__dirname, "./main/src/") },
    ],
  },
});