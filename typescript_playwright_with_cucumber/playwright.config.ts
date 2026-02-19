import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 90000,
  retries: 1,
  reporter: [
    ["line"], 
    ["html", { outputFolder: "playwright-report", open: "never" }]
  ],
  use: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.DEBUG ? 500 : 0,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    navigationTimeout: 60000,
    actionTimeout: 30000,
  },
  workers: 4,
 
});
