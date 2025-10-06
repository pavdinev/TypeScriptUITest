import { Page, Locator } from '@playwright/test';

export class FiltersComponent {
  readonly page: Page;
  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly applyButton: Locator;
  readonly clearButton: Locator;
  readonly selectedFilters: Locator;

  constructor(page: Page) {
    this.page = page;
    this.minPriceInput = page.locator('[data-test="min-price"]');     // TODO: confirm selectors
    this.maxPriceInput = page.locator('[data-test="max-price"]');
    this.applyButton = page.locator('[data-test="apply-filters"]');
    this.clearButton = page.locator('[data-test="clear-filters"]');
    this.selectedFilters = page.locator('[data-test="selected-filters"]');
  }

  async applyPriceRange(min: number, max: number) {
    await this.minPriceInput.fill(String(min));
    await this.maxPriceInput.fill(String(max));
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/search') && r.status() === 200),
      this.applyButton.click()
    ]);
    await this.page.waitForLoadState('networkidle');
  }

  async clear() {
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/search') && r.status() === 200),
      this.clearButton.click()
    ]);
    await this.page.waitForLoadState('networkidle');
  }

  async getSelectedFiltersText() {
    return this.selectedFilters.innerText();
  }
}
