import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,

  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 50,

  use: {
    baseURL: 'https://shop.years.com',
    headless: false, // run headed for visible UI
    actionTimeout: 10_000,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',

    // Force desktop resolution
    viewport: { width: 1920, height: 1080 },
    screen: { width: 1920, height: 1080 },

    launchOptions: {
      args: ['--window-size=1920,1080'],
    },
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1920, height: 1080 },
        screen: { width: 1920, height: 1080 },
        launchOptions: {
          args: ['--window-size=1920,1080'],
        },
      },
    },
    // Uncomment if you want other browsers
    // {
    //   name: 'firefox-desktop',
    //   use: {
    //     browserName: 'firefox',
    //     headless: false,
    //     viewport: { width: 1920, height: 1080 },
    //     screen: { width: 1920, height: 1080 },
    //     launchOptions: { args: ['--width=1920', '--height=1080'] },
    //   },
    // },
  ],
});
