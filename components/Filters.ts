import { Page } from '@playwright/test';
import { Button } from '../components/Button';

export class FiltersComponent {
  readonly page: Page;

  readonly sortBy: Button;
  readonly sortHighToLow: Button;
  readonly sortLowToHigh: Button;
  readonly sortNewest: Button;

  readonly productType: Button;
  readonly allProducts: Button;

  readonly protein: Button;
  readonly allProteins: Button;

  constructor(page: Page) {
    this.page = page;

    // Sort by
    this.sortBy = new Button(page, 'button:has-text("Sort by")', 'Sort By');
    this.sortHighToLow = new Button(page, 'button:has-text("High to Low")', 'High to Low');
    this.sortLowToHigh = new Button(page, 'button:has-text("Low to High")', 'Low to High');
    this.sortNewest = new Button(page, 'button:has-text("Newest")', 'Newest');

    // Product Type
    this.productType = new Button(page, 'button:has-text("Product Type")', 'Product Type');
    this.allProducts = new Button(page, 'button:has-text("All Products")', 'All Products');

    // Protein
    this.protein = new Button(page, 'button:has-text("Protein")', 'Protein');
    this.allProteins = new Button(page, 'button:has-text("All Proteins")', 'All Proteins');
  }
}
