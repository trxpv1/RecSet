import { defineConfig, Plugin, searchForWorkspaceRoot } from "vite"; // Added searchForWorkspaceRoot
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "26b6054106cf.ngrok-free.app",
      "07069c1a036b.ngrok-free.app"
    ],
    fs: {
      allow: [
        // Allow the project root so index.html can be served
        searchForWorkspaceRoot(process.cwd()),
        "./client", 
        "./shared"
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", 
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
