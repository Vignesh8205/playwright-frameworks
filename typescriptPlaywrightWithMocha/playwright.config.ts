import { defineConfig } from "@playwright/test";
import NativeTextReporter from "./reporter/native-text-reporter";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  retries: 1,
  reporter: [
    ["line"], 
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["./reporter/native-text-reporter.ts"]
  ],
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  workers: 4,
  // projects
});
