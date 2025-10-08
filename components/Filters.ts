// components/FiltersComponent.ts
import { Page } from '@playwright/test';
import { FiltersPage } from '../pages/FiltersPage';

export class FiltersComponent {
  readonly page: Page;
  readonly locators: FiltersPage;

  constructor(page: Page) {
    this.page = page;
    this.locators = new FiltersPage(page);
  }

  /**
   * Opens the correct dropdown and clicks the target option.
   */
  async applyFilter(filterValue: string) {
    const sortFilters = ['Price: High to Low', 'Price: Low to High', 'Newest First'];
    const productTypes = ['All Products', 'Toppers', 'Meals', 'Treats', 'Wellness', 'Accessories'];
    const proteins = ['All Proteins', 'Chicken', 'Beef', 'Vegan'];

    if (productTypes.includes(filterValue)) {
      await this.locators.productType.locator.click();
      await this.page
        .getByRole('button', { name: filterValue })
        .or(this.page.getByText(filterValue))
        .click();
      return;
    }

    if (proteins.includes(filterValue)) {
      await this.locators.protein.locator.click();
      await this.page
        .getByRole('button', { name: filterValue })
        .or(this.page.getByText(filterValue))
        .click();
      return;
    }

    if (sortFilters.includes(filterValue)) {
      await this.locators.sortByButton.locator.click();
      await this.page
        .getByRole('button', { name: filterValue })
        .or(this.page.getByText(filterValue))
        .click();
      return;
    }

    throw new Error(`❌ No matching filter found for: ${filterValue}`);
  }
}
