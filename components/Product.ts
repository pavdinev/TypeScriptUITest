import { ProductPage } from '../pages/ProductPage';

export interface ProductData {
  name: string;
  price: string;
  category?: string;
  protein?: string;
}

export class Product {
  private productsPage: ProductPage;

  constructor(productsPage: ProductPage) {
    this.productsPage = productsPage;
  }

  async listProducts(): Promise<ProductData[]> {
    const count = await this.productsPage.productCardsLocator.count();
    const products: ProductData[] = [];

    for (let i = 0; i < count; i++) {
      const card = this.productsPage.card(i);

      const name = await card.name.innerText().catch(() => 'N/A');
      const price = await card.price.innerText().catch(() => 'N/A');
      const category = await card.description.innerText().catch(() => undefined);
      const additionalInfo = await card.additionalInfo.allInnerTexts().catch(() => []);
      const protein = additionalInfo.length > 0 ? additionalInfo[0] : undefined;

      products.push({ name, price, category, protein });
    }

    return products;
  }

  async isSortedByPrice(order: 'asc' | 'desc' = 'asc', products?: ProductData[]): Promise<boolean> {
    const items = products ?? await this.listProducts();
    const prices = items.map(p => parseFloat(p.price.replace(/[£$]/g, '')));

    for (let i = 0; i < prices.length - 1; i++) {
      if (order === 'asc' && prices[i] > prices[i + 1]) return false;
      if (order === 'desc' && prices[i] < prices[i + 1]) return false;
    }
    return true;
  }

  async isSortedByName(order: 'asc' | 'desc' = 'asc', products?: ProductData[]): Promise<boolean> {
    const items = products ?? await this.listProducts();
    const names = items.map(p => p.name.toLowerCase());

    for (let i = 0; i < names.length - 1; i++) {
      if (order === 'asc' && names[i] > names[i + 1]) return false;
      if (order === 'desc' && names[i] < names[i + 1]) return false;
    }
    return true;
  }

  async verifyProductsFilteredCorrectly(
    options: { sort?: 'price' | 'name'; order?: 'asc' | 'desc'; category?: string; protein?: string },
    products?: ProductData[]
  ) {
    const { sort, order = 'asc', category, protein } = options;
    const items = products ?? await this.listProducts();

    console.log('--- Products snapshot ---');
    items.forEach((p, idx) => {
      console.log(`${idx + 1}: name="${p.name}", price="${p.price}", category="${p.category}", protein="${p.protein}"`);
    });
    console.log('------------------------');

    if (sort) {
      let isSorted = false;
      if (sort === 'price') isSorted = await this.isSortedByPrice(order, items);
      if (sort === 'name') isSorted = await this.isSortedByName(order, items);
      if (!isSorted) throw new Error(`Products are not sorted correctly by ${sort} (${order})`);
    }

    if (category) {
      const wrongCategory = items.find(p => p.category?.toLowerCase() !== category.toLowerCase());
      if (wrongCategory) throw new Error(`Some products do not match the category filter: ${category}`);
    }

    if (protein) {
      const wrongProtein = items.find(p => p.protein?.toLowerCase() !== protein.toLowerCase());
      if (wrongProtein) throw new Error(`Some products do not match the protein filter: ${protein}`);
    }
  }

  async verifyProteinFromName(products: ProductData[], protein: string): Promise<void> {
    const lowerProtein = protein.toLowerCase();
    const wrongProducts = products.filter(p => !p.name.toLowerCase().includes(lowerProtein));

    if (wrongProducts.length > 0) {
      throw new Error(
        `Some products do not match the protein filter "${protein}": ` +
        wrongProducts.map(p => `"${p.name}"`).join(', ')
      );
    }

    console.log(`✅ All products match protein filter: ${protein}`);
  }
}
