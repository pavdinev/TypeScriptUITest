import { defineConfig } from '@playwright/test';



export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  use: {
    baseURL:'https://shop.years.com',
    headless: true,
    actionTimeout: 10_000,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    // add firefox/webkit if needed
  ],
});

