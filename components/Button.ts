import { Page, Locator, expect } from '@playwright/test';

export class Button {
  page: Page;
  selector: string;
  name: string;
  locator: Locator;

  constructor(page: Page, selector: string, name?: string) {
    this.page = page;
    this.selector = selector;
    this.name = name || selector;
    this.locator = page.locator(selector);
  }

  async exists() {
    await expect(this.locator).toBeVisible({ timeout: 5000 });
  }

  async scrollAndClick() {
    await this.locator.scrollIntoViewIfNeeded();
    await this.locator.click();
  }

  async checkText(expectedText: string) {
    await expect(this.locator).toHaveText(expectedText);
  }
}
