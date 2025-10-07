import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,

  // ✅ Allow parallel execution within one file
  fullyParallel: true,

  // ✅ Retries (good for CI)
  retries: process.env.CI ? 2 : 0,

  // ✅ Worker count (set explicitly)
  workers: process.env.CI ? 4 : 4, // Always define a number, never undefined

  use: {
    baseURL: 'https://shop.years.com',
    headless: true,
    actionTimeout: 10_000,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Add more if needed:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
