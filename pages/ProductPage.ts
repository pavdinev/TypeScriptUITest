import { Page } from '@playwright/test';
import { ProductCard } from '../components/ProductCard';

export class ProductsPage {
  readonly page: Page;
  readonly productCardsLocator: any; // Locator for product cards

  constructor(page: Page) {
    this.page = page;
    this.productCardsLocator = page.locator('div.grid > div'); // All product cards
  }

  // Tests or components will wrap each card with ProductCard dynamically
}
