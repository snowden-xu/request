import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "SnowyPeakRequest",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["axios"],
    },
  },
  plugins: [dts()],
});
