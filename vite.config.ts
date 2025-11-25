import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// IMPORTANT: Update REPO_NAME to match your GitHub repository name
// If your repo is "username/repo-name", set REPO_NAME to "repo-name"
// If deploying to username.github.io (user/organization page), set REPO_NAME to ""
const REPO_NAME = "prompt-workbench-redesign"; // e.g., "prompt-workbench-redesign" or "" for root domain

export default defineConfig(({ mode }) => ({
  // Base path for GitHub Pages
  base: process.env.GITHUB_PAGES === "true" 
    ? REPO_NAME ? `/${REPO_NAME}/` : "/"
    : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
