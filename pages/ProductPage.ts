import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  // All product cards
  readonly productCardsLocator: Locator;

  // Each card as a locator function returning a scoped object
  card = (index: number) => ({
    root: this.productCardsLocator.nth(index),
    name: this.productCardsLocator.nth(index).locator('p.text-m.font-bold.text-neutral-900'),
    price: this.productCardsLocator.nth(index).locator('p.font-bold.text-neutral-900:not(.text-m)'),
    description: this.productCardsLocator.nth(index).locator('div.line-clamp-5 p'),
    additionalInfo: this.productCardsLocator.nth(index).locator('div.bg-yellow-200 p.text-xs'),
  });

  constructor(page: Page) {
    this.page = page;

    // All product cards
    this.productCardsLocator = page.locator('.group.flex');
  }
}
