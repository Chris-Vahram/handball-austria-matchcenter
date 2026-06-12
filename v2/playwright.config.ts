import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: true
  },
  use: { baseURL: "http://127.0.0.1:3001" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } }
  ]
});
