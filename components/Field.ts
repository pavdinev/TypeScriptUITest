import { Page, Locator, expect } from '@playwright/test';

export class Field {
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

  async fill(value: string) {
    await this.locator.scrollIntoViewIfNeeded();
    await this.locator.fill(value);
  }

  async checkValue(expectedValue: string) {
    await expect(this.locator).toHaveValue(expectedValue);
  }
}
