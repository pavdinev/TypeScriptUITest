import { Page } from '@playwright/test';
import { Field } from '../components/Field';
import { ProductCard } from '../components/ProductCard';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Field;
  readonly productCardsLocator: any; // Locator for search result cards

  constructor(page: Page) {
    this.page = page;

    // Wrap the search input with Field component
    this.searchInput = new Field(page, 'header input[placeholder="Search..."]:visible', 'Search Input');

    // Locator for all search result product cards
    this.productCardsLocator = page.locator('[data-test="product-item"]');
  }

  // Tests will dynamically create ProductCard instances from productCardsLocator
}
