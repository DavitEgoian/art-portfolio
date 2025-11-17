import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Allow overriding the deploy base with VITE_BASE_PATH; default to root for custom domains.
  base: process.env.VITE_BASE_PATH?.trim() || "/",
  plugins: [react(), imagetools(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
