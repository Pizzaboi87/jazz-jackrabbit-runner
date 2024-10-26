import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    VitePWA({
      manifest: {
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "graphics/*", "sounds/*", "fonts/*"],
        name: "Jazz Jackrabbit Runner",
        short_name: "Jazz",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/jj-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/jj-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshot.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshot-2.png",
            sizes: "720x1280",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // defining cached files formats
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      },
    }),
  ],
});
