import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 120_000,        // global timeout per test
  fullyParallel: false,    // safer for UI-heavy tests
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 4,  // don't overload your machine

  use: {
    baseURL: 'https://shop.years.com',
    headless: true,
    actionTimeout: 30_000,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 },
    screen: { width: 1920, height: 1080 },
    launchOptions: { args: ['--window-size=1920,1080'] },
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1920, height: 1080 },
        screen: { width: 1920, height: 1080 },
        launchOptions: { args: ['--window-size=1920,1080'] },
      },
    },
  ],
});
