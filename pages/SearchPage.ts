import { Page, Locator, expect } from '@playwright/test';


export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly productItems: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly baseURL: string;

  constructor(page: Page) {
    this.page = page;
    
    this.searchInput = page.locator('[data-test="search-input"]'); // TODO: update selector to match app
    this.productItems = page.locator('[data-test="product-item"]');
    this.productTitle = page.locator('[data-test="product-title"]');
    this.productPrice = page.locator('[data-test="product-price"]');
  }

  async goto() {
    
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    // press Enter to submit; if app has search button use that instead
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/search') && r.status() === 200),
      this.searchInput.press('Enter'),
    ]);
    await this.page.waitForLoadState('networkidle');
  }

  async resultsCount() {
    return this.productItems.count();
  }

  async resultTitles() {
    return this.productTitle.allInnerTexts();
  }

  async openResult(index = 0) {
    await this.productItems.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async pricesArray(): Promise<number[]> {
    const texts = await this.productPrice.allTextContents();
    return texts.map(t => {
      const num = parseFloat(t.replace(/[^\d.,-]/g, '').replace(',', '.'));
      return Number.isFinite(num) ? num : NaN;
    }).filter(n => !Number.isNaN(n));
  }
}
