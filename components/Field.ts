import { Page } from '@playwright/test';
import { Button } from './Button';

export class Filters {
  sortBy: Button;
  sortHighToLow: Button;
  sortLowToHigh: Button;
  sortNewest: Button;

  productType: Button;
  allProducts: Button;

  protein: Button;
  allProteins: Button;

  constructor(page: Page) {
    this.sortBy = new Button(page, 'button:has-text("Sort by")');
    this.sortHighToLow = new Button(page, 'button:has-text("High to Low")');
    this.sortLowToHigh = new Button(page, 'button:has-text("Low to High")');
    this.sortNewest = new Button(page, 'button:has-text("Newest")');

    this.productType = new Button(page, 'button:has-text("Product Type")');
    this.allProducts = new Button(page, 'button:has-text("All Products")');

    this.protein = new Button(page, 'button:has-text("Protein")');
    this.allProteins = new Button(page, 'button:has-text("All Proteins")');
  }

  async selectSort(option: 'highToLow' | 'lowToHigh' | 'newest') {
    await this.sortBy.scrollAndClick();
    switch(option) {
      case 'highToLow': await this.sortHighToLow.scrollAndClick(); break;
      case 'lowToHigh': await this.sortLowToHigh.scrollAndClick(); break;
      case 'newest': await this.sortNewest.scrollAndClick(); break;
    }
  }

  async selectProductType(name: string) {
    await this.productType.scrollAndClick();
    await this.page.locator(`text=${name}`).click();
  }

  async selectProtein(name: string) {
    await this.protein.scrollAndClick();
    await this.page.locator(`text=${name}`).click();
  }

  async resetFilters() {
    await this.selectProductType('All Products');
    await this.selectProtein('All Proteins');
    await this.selectSort('newest');
  }
}
