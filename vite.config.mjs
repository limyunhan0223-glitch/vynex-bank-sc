import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    // Pre-bundle the lazy scene's dependencies before serving the first page.
    // Late discovery previously left the scene pointing at an outdated Drei bundle.
    include: [
      "react", "react-dom/client", "three", "@react-three/fiber",
      "@react-three/drei/core/Environment.js",
      "@react-three/drei/core/Lightformer.js",
      "@react-three/drei/core/RoundedBox.js",
      "@react-three/drei/web/Html.js",
    ],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.tsx"],
    },
  },
  plugins: [react(), tailwindcss()],
});

