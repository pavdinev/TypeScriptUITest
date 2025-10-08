import { Locator, Page } from '@playwright/test';
import { ProductPage } from '../pages/ProductsPage';

export interface ProductData {
  name: string;
  price: string;
}

export class Product {
  page: Page;
  productCards: Locator;
  nameSelector: string;
  priceSelector: string;

  constructor(page: Page, productsPage: ProductPage) {
    this.page = page;
    this.productCards = productsPage.productCards;
    this.nameSelector = productsPage.productName;
    this.priceSelector = productsPage.productPrice;
  }

  async listProducts(): Promise<ProductData[]> {
    const count = await this.productCards.count();
    const products: ProductData[] = [];

    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const name = await card.locator(this.nameSelector).innerText();
      const price = await card.locator(this.priceSelector).innerText();
      products.push({ name, price });
    }

    return products;
  }
}
