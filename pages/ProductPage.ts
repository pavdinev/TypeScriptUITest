import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly priceLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('[data-test="product-title"]');
    this.priceLocator = page.locator('[data-test="product-price"]');
  }

  async getTitle() { return this.productTitle.innerText(); }
  async getPriceText() { return this.priceLocator.innerText(); }
}
