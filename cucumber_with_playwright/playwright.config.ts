import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './features',
    timeout: 120 * 1000,
    expect: {
        timeout: 10000
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', { outputFolder: 'reports/playwright-report' }],
        ['json', { outputFile: 'reports/test-results.json' }],
        ['junit', { outputFile: 'reports/junit-results.xml' }]
    ],
    use: {
        baseURL: process.env.BASE_URL || 'https://example.com',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: process.env.HEADLESS !== 'false',
        viewport: null,
        ignoreHTTPSErrors: true,
        actionTimeout: 15000,
        navigationTimeout: 30000,
        launchOptions: {
  args: ['--start-maximized']
}
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'mobile-chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'mobile-safari',
            use: { ...devices['iPhone 12'] },
        }
    ],

    outputDir: 'reports/test-artifacts',
});
