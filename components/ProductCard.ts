import { Locator, Page, expect } from '@playwright/test';

export class ProductCard {
  readonly page: Page;
  readonly cardLocator: Locator;

  constructor(page: Page, cardLocator: Locator) {
    this.page = page;
    this.cardLocator = cardLocator;
  }

  async getName(): Promise<string> {
    const nameLocator = this.cardLocator.locator('.product-name, [data-test="product-title"]');
    await expect(nameLocator).toBeVisible();
    return await nameLocator.innerText();
  }

  async getPrice(): Promise<string> {
    const priceLocator = this.cardLocator.locator('.product-price, [data-test="product-price"]');
    await expect(priceLocator).toBeVisible();
    return await priceLocator.innerText();
  }

  async click(): Promise<void> {
    await this.cardLocator.scrollIntoViewIfNeeded();
    await this.cardLocator.click();
  }
}
